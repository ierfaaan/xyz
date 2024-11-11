import { Injectable } from '@nestjs/common';
import { LoginPayloadDtoType, LoginResponseDtoType } from './dto';
import { JwtService } from '@nestjs/jwt';
import {
  OperationResultObject,
  TResult,
} from 'src/models/common/operationResult';

const fakeUsers = [
  {
    id: 1,
    username: 'erfan',
    password: 'password',
  },
  {
    id: 2,
    username: 'mari',
    password: 'marimari',
  },
];

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login({
    username,
    password,
  }: LoginPayloadDtoType): TResult<LoginResponseDtoType> {
    const findUser = fakeUsers.find((user) => user.username === username);
    if (!findUser)
      return OperationResultObject.notFound<LoginResponseDtoType>(
        'user not found!',
      );
    if (password === findUser.password) {
      const { password: _pass, ...userWithoutPassword } = findUser;
      const loginResult = this.jwtService.sign(userWithoutPassword);
      return OperationResultObject.success({ jwt: loginResult });
    } else {
      return OperationResultObject.error<LoginResponseDtoType>({
        password: 'invalid password!',
      });
    }
  }
}
