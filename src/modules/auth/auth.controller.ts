import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { operationProcessor } from 'src/common/utils/opration';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() request) {
    return operationProcessor(this.authService.login(request.user.result));
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile() {
    return 'this is profile';
  }
}
