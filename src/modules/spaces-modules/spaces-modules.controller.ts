import { Controller, Post, Body, UseGuards, Param } from '@nestjs/common';
import { SpacesModulesService } from './services/spaces-modules.service';
import { CreateSpacesModuleDto } from './dto/create-module.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserIdFromToken } from 'src/common/decorators/jwt.decorator';
import { TUserIdFromToken } from 'src/common/types/userId';
import { SpacesModulesUrlParams } from './dto/spaces-modules.payload';
import { Operation } from 'src/common/utils/opration';

@Controller('spaces/:spaceId/modules')
@UseGuards(JwtAuthGuard)
export class SpacesModulesController {
  constructor(private readonly spacesModulesService: SpacesModulesService) {}

  @Post()
  async createForm(
    @UserIdFromToken() userId: TUserIdFromToken,
    @Param('spaceId') spaceId: SpacesModulesUrlParams['spaceId'],
    @Body() createFormBody: CreateSpacesModuleDto,
  ) {
    return Operation.processor(
      await this.spacesModulesService.createSpaceModule({
        userId: Number(userId),
        spaceId: Number(spaceId),
        ...createFormBody,
      }),
    );
  }

  // @Get()
  // async findAllUserFormsInSpace(
  //   @UserIdFromToken() userId: TUserIdFromToken,
  //   @Param('spaceId') spaceId: SpacesModulesUrlParams['spaceId'],
  // ) {
  //   return Operation.processor(
  //     await this.spacesModulesService.findAllUserFormsInSpace({
  //       spaceId: Number(spaceId),
  //       userId: Number(userId),
  //     }),
  //   );
  // }

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
