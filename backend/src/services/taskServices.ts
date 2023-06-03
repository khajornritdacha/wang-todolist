import { Response } from 'express';
import { UserRequest } from '../models/dto';
import { User, UserDto } from '../models/User';
import { Task } from '../models/Task';

export const getTasks = async (req: UserRequest, res: Response) => {
    try {
        const email = req.user?.email;

        if (!email) return res.sendStatus(401);

        const user = (await User.findOne({ email }).populate('tasks')) as any;
        if (!user) return res.sendStatus(401);

        if (!user?.tasks) return res.json([]);
        return res.json(user.tasks);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

export const getTask = async (req: UserRequest, res: Response) => {
    try {
        const { id } = req.params;
        const email = req.user?.email;

        if (!email || !id) return res.sendStatus(401);

        const task = (await Task.findById(id)) as any;
        if (!task) return res.status(401).json({ message: 'Task not found' });

        const user = (await User.findOne({ email })) as any;
        if (!user) return res.sendStatus(401);

        if (String(user._id) !== String(task.ownerId))
            return res.status(403).json({
                message: 'You are not authorized to access this task',
            });
        return res.json(task);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

export const createTask = async (req: UserRequest, res: Response) => {
    try {
        const email = req.user?.email;
        const { title, dueDate, dueTime } = req.body;

        if (!email || !title || !dueDate || !dueTime)
            return res.sendStatus(401);

        const user = await User.findOne({ email });

        if (user) {
            const task = new Task({
                title,
                dueDate,
                dueTime,
                isCompleted: false,
                ownerId: user._id,
            });
            await task.save();
            if (!user?.tasks) user.tasks = [];
            user.tasks.push(task._id);
            await user.save();
            return res.status(201).json(task);
        }
        return res.sendStatus(401);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

export const updateTask = async (req: UserRequest, res: Response) => {
    try {
        const task = req.body?.task;

        if (!task) return res.sendStatus(401);

        let prevTask = await Task.findById(task._id);
        prevTask = task;
        if (prevTask) {
            await prevTask.save();
            return res.status(200).json(prevTask);
        }
        return res.status(401);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

export const deleteTask = async (req: UserRequest, res: Response) => {
    try {
        const { id } = req.params;
        const email = req.user?.email;

        console.log('Delete task with id: ' + id);

        if (!email || !id) return res.sendStatus(401);

        const task = (await Task.findById(id)) as any;
        if (!task) return res.status(401).json({ message: 'Task not found' });

        const user = (await User.findOne({ email })) as any;
        if (!user) return res.sendStatus(401);

        console.log('User id: ' + user._id);
        console.log("Task owner's id: " + task.ownerId);

        console.log('Match id: ' + (String(user._id) === String(task.ownerId)));

        if (String(user._id) !== String(task.ownerId))
            return res.status(403).json({
                message: 'You are not authorized to access this task',
            });

        await Task.findByIdAndDelete(id);
        user.tasks = user.tasks.filter((taskId: string) => taskId !== id);
        await user.save();
        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};
