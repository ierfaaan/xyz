import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules';
import {
  BadRequestExceptionGlobalFilter,
  GlobalErrorFilter,
} from './common/filters';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/esponse.interceptor';
import { BadRequestExceptionApp } from './common/exceptions';
import { UnauthorizedExceptionFilter } from './common/filters/unauthorizedException';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
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
    new GlobalErrorFilter(),
    new BadRequestExceptionGlobalFilter(),
    new UnauthorizedExceptionFilter(),
  );
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server run in port: http://localhost:${process.env.PORT}`);
}

bootstrap();
