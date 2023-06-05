import { Response } from 'express';
import { Task, TaskDto } from '../models/Task';
import { User, UserDto } from '../models/User';
import { UserRequest } from '../models/dto';

// TODO: add dates
// TODO: query user with middlewares
export const getTasks = async (req: UserRequest, res: Response) => {
    try {
        const email = req.user?.email;

        if (!email) return res.sendStatus(401);

        const user = (await User.findOne({ email }).populate(
            'tasks'
        )) as UserDto;
        if (!user) return res.sendStatus(401);
        if (!user?.tasks) return res.json([]);

        // Group data by date
        const groupDate = user.tasks.reduce((dataGDate, task: TaskDto) => {
            dataGDate[task.dueDate] = dataGDate[task.dueDate] || [];
            dataGDate[task.dueDate].push(task);
            return dataGDate;
        }, Object.create(null));

        // Turn object into array
        const sortedGroupDate = Object.keys(groupDate)
            .sort()
            .reduce(
                (data: { date: string; tasks: TaskDto[] }[], date: string) => {
                    // Sort by dueTime
                    groupDate[date].sort((a: TaskDto, b: TaskDto) =>
                        a.dueTime < b.dueTime ? -1 : 1
                    );
                    data.push({ date, tasks: groupDate[date] });
                    return data;
                },
                []
            );

        return res.json({ data: sortedGroupDate });
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

        if (!email || !title) return res.sendStatus(401);

        if (!dueDate || !dueTime) return res.sendStatus(400);

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
        const task = req.body?.task as TaskDto;

        if (!task) return res.sendStatus(400);

        const result = await Task.findOneAndReplace({ _id: task._id }, task, {
            new: true,
        });

        return res.status(200).json(result);
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
        if (!task) return res.status(400).json({ message: 'Task not found' });

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
