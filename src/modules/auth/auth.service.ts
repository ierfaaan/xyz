import { Injectable } from '@nestjs/common';
import { LoginPayloadDtoType } from './dto';
import { JwtService } from '@nestjs/jwt';
import {
  UserValidatePayloadDtoType,
  UserValidateResponseDtoType,
} from './dto/validate.dto';
import { IOperationResult } from 'src/common/types/HttpResponse';
import { Operation } from 'src/common/utils/opration';
import { PrismaService } from 'src/common/services';
import * as bcrypyt from 'bcrypt';
import { RegisterPayloadDtoType } from './dto/register';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async validateUser({
    username,
    password,
  }: UserValidatePayloadDtoType): Promise<
    IOperationResult<UserValidateResponseDtoType>
  > {
    const findUser = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (!findUser || !bcrypyt.compareSync(password, findUser.password)) {
      return Operation.error({
        message: 'The username or password is incorrect.',
        fieldErrors: {
          username: 'username is incorrect',
          password: 'password is incorrect',
        },
      });
    }

    const { password: _pass, ...userWithoutPassword } = findUser;
    return Operation.success({
      result: userWithoutPassword,
    });
  }

  login({ username, id }: LoginPayloadDtoType) {
    const loginResult = this.jwtService.sign({ username, id });
    return Operation.success({
      result: { token: loginResult },
      message: 'The login operation was successful.',
    });
  }

  async register({
    password,
    username,
  }: RegisterPayloadDtoType): Promise<IOperationResult<null>> {
    const findUser = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (findUser) {
      return Operation.error({
        message: 'Username already taken. Choose another.',
        fieldErrors: {
          username: 'Username already taken. Choose another.',
        },
      });
    }

    const hashPassword = bcrypyt.hashSync(password, 10);

    await this.prismaService.user.create({
      data: {
        password: hashPassword,
        username: username,
      },
    });

    return Operation.success({
      result: null,
      message: 'Registration successful.',
    });
  }
}
