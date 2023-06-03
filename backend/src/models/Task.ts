import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    dueDate: { type: String, required: true },
    dueTime: { type: String, required: true },
});

export const Task = mongoose.model('Task', TaskSchema);
