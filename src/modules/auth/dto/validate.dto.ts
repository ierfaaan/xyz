import { IsNotEmpty, IsString } from 'class-validator';

export class UserValidateResponseDtoType {
  username: string;
  id: string;
}

export class UserValidatePayloadDtoType {
  @IsNotEmpty({ message: 'username is required' })
  @IsString()
  username: string;
  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  password: string;
}
