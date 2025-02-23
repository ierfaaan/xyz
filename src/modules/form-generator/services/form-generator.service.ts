import { Injectable } from '@nestjs/common';
import {
  CreateFormPropsType,
  FindAllUserFormsInSpacePropsType,
} from './form-generator.type';
import { PrismaService } from 'src/common/services';
import { Operation } from 'src/common/utils/opration';
import { $Enums } from '@prisma/client';

@Injectable()
export class FormGeneratorService {
  constructor(private readonly prisma: PrismaService) {}

  async createForm(props: CreateFormPropsType) {
    const spaceMembership = await this.prisma.spaceMembership.findFirst({
      where: {
        spaceId: props.spaceId,
        userId: props.userId,
      },
    });

    if (!spaceMembership)
      return Operation.notFoundError({ message: 'Team or user not found!' });

    const currentForm = await this.prisma.formModule.create({
      data: {
        title: props.title,
        spaceId: props.spaceId,
      },
    });

    await this.prisma.formSpaceMembers.create({
      data: {
        formId: currentForm.id,
        spaceMemberId: spaceMembership.id,
        Role: $Enums.FormSpaceMembersRole.OWNER,
      },
    });

    return Operation.success({
      message: 'Form generator module has been created successfully!',
    });
  }

  async findAllUserFormsInSpace(props: FindAllUserFormsInSpacePropsType) {
    const formGenerators = await this.prisma.formModule.findMany({
      where: {
        spaceId: props.spaceId,
        FormSpaceMembers: {
          some: {
            spaceMemberId: props.userId,
          },
        },
      },
    });
    if (!formGenerators || formGenerators.length === 0) {
      return Operation.notFoundError({
        message: 'form generator not found!',
        result: [],
      });
    }
    return Operation.success({
      result: formGenerators,
    });
  }

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
