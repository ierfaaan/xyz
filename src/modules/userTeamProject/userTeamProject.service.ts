import { Injectable } from '@nestjs/common';
import { SingleProjectPayloadDto } from './dto/common';
import { IOperationResult, OpreationType } from 'src/common/types/HttpResponse';
import { Operation } from 'src/common/utils/opration';
import { GetUserProjectResponseDto } from './dto/getUserProject.dto';
import { TUserIdFromToken } from 'src/common/types/userId';
import { PrismaService } from 'src/common/services';
import {
  CreateOrEditUserProjectPayloadDto,
  CreateUserOrEditProjectResponseDto,
} from './dto/createOrEditUserProject.dto';

import { DEFAULT_RPOJECT_ROLE } from 'src/common/constants/defaultRole';

@Injectable()
export class UserTeamProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  private async findUserTeamProject<T>({
    teamId,
    projectId,
    userId,
  }: SingleProjectPayloadDto): Promise<IOperationResult<T>> {
    const userProject = await this.prismaService.project.findUnique({
      where: {
        teamId: Number(teamId),
        id: Number(projectId),
        ProjectMembership: {
          some: {
            userId: Number(userId),
            roleName: DEFAULT_RPOJECT_ROLE.OWNER,
          },
        },
      },
    });

    if (!userProject) {
      return Operation.notFoundError({ message: 'The Project does not exist' });
    }

    return Operation.success<T>({ result: userProject as T });
  }

  async getUserTeamProject(
    payload: SingleProjectPayloadDto,
  ): Promise<IOperationResult<GetUserProjectResponseDto>> {
    const userProjectOperation =
      await this.findUserTeamProject<GetUserProjectResponseDto>(payload);
    return Operation.success({ result: userProjectOperation.result });
  }

  async getUserTeamProjects(
    userId: TUserIdFromToken,
  ): Promise<IOperationResult<GetUserProjectResponseDto[]>> {
    const userProject = await this.prismaService.project.findMany({
      where: {
        ProjectMembership: {
          some: {
            userId: Number(userId),
            roleName: DEFAULT_RPOJECT_ROLE.OWNER,
          },
        },
      },
    });

    if (!userProject || userProject.length === 0) {
      Operation.notFoundError({ message: 'The Project does not exist' });
    }

    return Operation.success<GetUserProjectResponseDto[]>({
      result: userProject.map((item) => ({ ...item, parentId: 4 })),
    });
  }

  async createUserTeamProject(
    paramPayload: Omit<SingleProjectPayloadDto, 'projectId'>,
    createUserBody: CreateOrEditUserProjectPayloadDto,
  ): Promise<IOperationResult<CreateUserOrEditProjectResponseDto>> {
    const Project = await this.prismaService.project.create({
      data: {
        teamId: Number(paramPayload.teamId),
        name: createUserBody.name,
        logo: createUserBody.logo,
        ProjectMembership: {
          create: {
            userId: Number(paramPayload.userId),
            status: 'ACTIVE',
            roleName: DEFAULT_RPOJECT_ROLE.OWNER,
          },
        },
      },
    });

    return Operation.success({
      message: 'Project created successfully.',
      result: Project,
    });
  }

  async editUserTeamProject(
    payload: SingleProjectPayloadDto,
    editUserBody: CreateOrEditUserProjectPayloadDto,
  ): Promise<IOperationResult<CreateUserOrEditProjectResponseDto>> {
    await this.findUserTeamProject(payload);

    const updatedProject = await this.prismaService.project.update({
      where: {
        id: Number(payload.projectId),
      },
      data: {
        name: editUserBody.name,
        logo: editUserBody.logo,
      },
    });

    return Operation.success({
      message: 'Project updated successfully.',
      result: updatedProject,
    });
  }

  async deleteUserTeamProject(
    payload: SingleProjectPayloadDto,
  ): Promise<IOperationResult<null>> {
    const findUserOperation = await this.findUserTeamProject<null>(payload);

    if (findUserOperation.type === OpreationType.NotFound) {
      return findUserOperation;
    }

    await this.prismaService.project.delete({
      where: { id: Number(payload.projectId) },
    });

    return Operation.success({
      message: 'Project deleted successfully.',
      result: null,
    });
  }
}
