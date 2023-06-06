export interface TasksApiDto {
  data: {
    date: string;
    dayDiff: number;
    tasks: TaskDto[];
  }[];
}

export interface TaskDto {
  _id: string;
  title: string;
  dueDate: string;
  dueTime: string;
  isCompleted: boolean;
  ownerId: string;
}

export interface UserDto {
  username: string;
  name: string;
  registeredAt: string;
}

export interface CredentialDto {
  accessToken: string;
}

export interface ErrorDto {
  statusCode: number;
  message: string;
  error: string;
}
