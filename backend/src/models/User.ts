import mongoose, { InferSchemaType, Model } from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

export type UserDto = InferSchemaType<typeof UserSchema>;

export const User = mongoose.model('User', UserSchema);
