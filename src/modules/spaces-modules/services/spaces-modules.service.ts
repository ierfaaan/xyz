import { Injectable } from '@nestjs/common';
import { CreateSpacesModulePropsType } from './spaces-modules.type';
import { PrismaService } from 'src/common/services';
import { Operation } from 'src/common/utils/opration';
import { $Enums } from '@prisma/client';

@Injectable()
export class SpacesModulesService {
  constructor(private readonly prisma: PrismaService) {}

  async createSpaceModule(props: CreateSpacesModulePropsType) {
    const spaceMembership = await this.prisma.spaceMembership.findFirst({
      where: {
        spaceId: props.spaceId,
        userId: props.userId,
      },
    });

    if (!spaceMembership)
      return Operation.notFoundError({ message: 'Team or user not found!' });

    const spaceModule = await this.prisma.spaceModules.create({
      data: {
        moduleType: props.moduleType,
        title: props.title,
        spaceId: props.spaceId,
      },
    });

    if (spaceModule.moduleType === $Enums.ModuleType.FORM_GENERATOR) {
      await this.prisma.formModule.create({
        data: {
          moduleId: spaceModule.id,
        },
      });
    }

    await this.prisma.spaceModulesMembers.create({
      data: {
        spaceModuleId: spaceModule.id,
        spaceMemberId: spaceMembership.id,
        Role: $Enums.SpaceModulesMembersRole.OWNER,
      },
    });

    return Operation.success({
      result: null,
      message: 'module has been created successfully!',
    });
  }

  // async findAllUserFormsInSpace(props: FindAllSpacesModulesPropsType) {}

  // findOneFormsInSpace(props: FindOneFormsInSpacePropsType) {
  //   return `This action returns a #${id} formGenerator`;
  // }

  // updateForm(props: UpdateFormPropsType) {
  //   return `This action updates a #${id} formGenerator`;
  // }

  // removeForm(props: RemoveFormPropsType) {
  //   return `This action removes a #${id} formGenerator`;
  // }
}
