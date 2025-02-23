import { Module } from '@nestjs/common';
import { FormGeneratorService } from './services/form-generator.service';
import { FormGeneratorController } from './form-generator.controller';
import { PrismaService } from 'src/common/services';

@Module({
  controllers: [FormGeneratorController],
  providers: [FormGeneratorService, PrismaService],
})
export class FormGeneratorModule {}
