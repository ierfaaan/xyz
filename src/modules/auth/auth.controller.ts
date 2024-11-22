import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RegisterPayloadDtoType } from './dto/register';
import { Operation } from 'src/common/utils/opration';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() request) {
    return Operation.processor(this.authService.login(request.user.result));
  }

  @Post('register')
  async register(@Body() body: RegisterPayloadDtoType) {
    return Operation.processor(await this.authService.register(body));
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile() {
    return 'this is profile';
  }
}
