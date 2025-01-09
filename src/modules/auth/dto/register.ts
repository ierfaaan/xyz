import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterPayloadDtoType {
  @IsNotEmpty({ message: 'username is required' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  password: string;

  @IsNotEmpty({ message: 'firstname is required' })
  @IsString()
  firstname: string;

  @IsNotEmpty({ message: 'lastname is required' })
  @IsString()
  lastname: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  email: string;
}
