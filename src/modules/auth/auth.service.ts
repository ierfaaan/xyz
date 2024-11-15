import { Injectable } from '@nestjs/common';
import { LoginPayloadDtoType } from './dto';
import { JwtService } from '@nestjs/jwt';
import {
  UserValidatePayloadDtoType,
  UserValidateResponseDtoType,
} from './dto/validate.dto';
import { IOprationResult } from 'src/common/interfaces/HttpResponse';
import { Operation } from 'src/common/utils/opration';

const fakeUsers = [
  {
    id: '1',
    username: 'erfan',
    password: 'password',
  },
  {
    id: '2',
    username: 'mari',
    password: 'marimari',
  },
];

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser({
    username,
    password,
  }: UserValidatePayloadDtoType): Promise<
    IOprationResult<UserValidateResponseDtoType>
  > {
    const findUser = fakeUsers.find((user) => user.username === username);

    if (!findUser || findUser.password !== password) {
      return Operation.operationError({
        message: 'The username or password is incorrect.',
        fieldErrors: {
          username: 'username is incorrect',
          password: 'password is incorrect',
        },
      });
    }

    const { password: _pass, ...userWithoutPassword } = findUser;
    return Operation.operationSuccess({
      result: userWithoutPassword,
    });
  }

  login({ username, id }: LoginPayloadDtoType) {
    const loginResult = this.jwtService.sign({ username, id });
    return Operation.operationSuccess({
      result: { token: loginResult },
      message: 'The login operation was successful.',
    });
  }
}
