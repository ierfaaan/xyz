import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules';
import {
  BadRequestExceptionGlobalFilter,
  InternalServerErrorExceptionFilter,
  NotFoundExceptionFilter,
  UnauthorizedExceptionFilter,
} from './common/filters';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/esponse.interceptor';
import { BadRequestExceptionApp } from './common/exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory(errors) {
        const formattedErrors = {};

        errors.forEach((error) => {
          const property = error.property;
          const errorMessages = Object.values(error.constraints || {});

          if (!formattedErrors[property]) {
            formattedErrors[property] = [];
          }

          formattedErrors[property] =
            formattedErrors[property].concat(errorMessages);
        });

        throw new BadRequestExceptionApp({
          fieldErrors: formattedErrors,
          message:
            'Your request is invalid. Please check your input and try again.',
        });
      },
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(
    new InternalServerErrorExceptionFilter(),
    new NotFoundExceptionFilter(),
    new BadRequestExceptionGlobalFilter(),
    new UnauthorizedExceptionFilter(),
  );
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server run in port: http://localhost:${process.env.PORT}`);
}

bootstrap();
