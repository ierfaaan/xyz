import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterPayloadDtoType {
  @IsNotEmpty({ message: 'username is required' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  password: string;
}
