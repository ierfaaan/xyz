import { Controller, Post, Body, UseGuards, Param, Get } from '@nestjs/common';
import { FormGeneratorService } from './services/form-generator.service';
import { CreateFormDto } from './dto/create-form.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserIdFromToken } from 'src/common/decorators/jwt.decorator';
import { TUserIdFromToken } from 'src/common/types/userId';
import { FormGeneratorUrlParams } from './dto/form-generator.payload';
import { Operation } from 'src/common/utils/opration';

@Controller('spaces/:spaceId/form-generator')
@UseGuards(JwtAuthGuard)
export class FormGeneratorController {
  constructor(private readonly formGeneratorService: FormGeneratorService) {}

  @Post()
  async createForm(
    @UserIdFromToken() userId: TUserIdFromToken,
    @Param('spaceId') spaceId: FormGeneratorUrlParams['spaceId'],
    @Body() createFormBody: CreateFormDto,
  ) {
    return Operation.processor(
      await this.formGeneratorService.createForm({
        userId: Number(userId),
        spaceId: Number(spaceId),
        ...createFormBody,
      }),
    );
  }

  @Get()
  async findAllUserFormsInSpace(
    @UserIdFromToken() userId: TUserIdFromToken,
    @Param('spaceId') spaceId: FormGeneratorUrlParams['spaceId'],
  ) {
    return Operation.processor(
      await this.formGeneratorService.findAllUserFormsInSpace({
        spaceId: Number(spaceId),
        userId: Number(userId),
      }),
    );
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.formGeneratorService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateFormGeneratorDto: UpdateFormGeneratorDto,
  // ) {
  //   return this.formGeneratorService.update(+id, updateFormGeneratorDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.formGeneratorService.remove(+id);
  // }
}
