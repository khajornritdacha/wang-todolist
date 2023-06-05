import mongoose, { Document, InferSchemaType, Model } from 'mongoose';
import { TaskDto } from './Task';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

export type UserDto = Document &
    InferSchemaType<typeof UserSchema> & {
        tasks: TaskDto[];
    };

export const User = mongoose.model('User', UserSchema);
