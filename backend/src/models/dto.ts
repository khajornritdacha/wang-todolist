import { Request } from 'express';
import { UserDto } from './User';
import { TaskDto } from './Task';

export interface CredentialDto {
    email: string;
}

export interface UserRequest extends Request {
    user?: CredentialDto | UserDto;
}

export interface TaskApiDto {
    date: string;
    dayDiff: number;
    tasks: TaskDto[];
}
