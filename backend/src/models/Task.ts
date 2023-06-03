import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    dueDate: { type: String, required: true },
    dueTime: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export const Task = mongoose.model('Task', TaskSchema);
