import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
// import { BadRequestExceptionApp } from 'src/common/exceptions';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const request = context.switchToHttp().getRequest();
    // if (!request.body.password || !request.body.username) {
    //   throw new BadRequestExceptionApp({
    //     fieldErrors: {
    //       username: 'username field is required.',
    //       password: 'password field is required.',
    //     },
    //     message: 'username and password field is required.',
    //   });
    // }
    return super.canActivate(context);
  }
}
