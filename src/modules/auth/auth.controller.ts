import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginPayloadDtoType } from './dto';
import { AuthService } from './auth.service';
import { OperationResultMapperObject } from 'src/common/utils';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() loginPayload: LoginPayloadDtoType) {
    return OperationResultMapperObject.mapToHttp(
      this.authService.login(loginPayload),
    );
  }
}
