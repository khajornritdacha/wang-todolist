import { Request } from 'express';
import { UserDto } from './User';

export interface CredentialDto {
    email: string;
}

export interface UserRequest extends Request {
    user?: CredentialDto | UserDto;
}
