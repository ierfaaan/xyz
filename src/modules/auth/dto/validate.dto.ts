import { $Enums, User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserValidateResponseDtoType implements Omit<User, 'password'> {
  avatar: string;
  createdAt: Date;
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  phone: string;
  status: $Enums.Status;
  updatedAt: Date;
  username: string;
}

export class UserValidatePayloadDtoType {
  @IsNotEmpty({ message: 'username is required' })
  @IsString()
  username: string;
  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  password: string;
}
