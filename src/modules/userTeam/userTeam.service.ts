import { Injectable } from '@nestjs/common';
import { SingleTeamPayloadDto } from './dto/common';
import { IOperationResult } from 'src/common/types/HttpResponse';
import { Operation } from 'src/common/utils/opration';
import { GetUserTeamResponseDto } from './dto/getUserTeam.dto';
import { TUserIdFromToken } from 'src/common/types/userId';
import { PrismaService } from 'src/common/services';
import {
  CreateOrEditUserTeamPayloadDto,
  CreateUserOrEditTeamResponseDto,
} from './dto/createOrEditUserTeam.dto';
import {
  DEFAULT_TEAM_ROLE,
  DEFAULT_TEAM_ROLL_ACCESS,
} from 'src/common/constants/defaultRole';

@Injectable()
export class UserTeamService {
  constructor(private readonly prismaService: PrismaService) {}

  private async findUserTeam<T>(
    { teamId, userId }: SingleTeamPayloadDto,
    returnSuccessResult: boolean,
  ): Promise<IOperationResult<T>> {
    const userTeam = await this.prismaService.team.findUnique({
      where: {
        id: Number(teamId),
        TeamMembership: {
          some: {
            userId: Number(userId),
          },
        },
      },
    });

    if (!userTeam) {
      return Operation.notFoundError({ message: 'The team does not exist' });
    }

    if (returnSuccessResult)
      return Operation.success<T>({ result: userTeam as T });
  }

  async getUserTeam(
    payload: SingleTeamPayloadDto,
  ): Promise<IOperationResult<GetUserTeamResponseDto>> {
    return this.findUserTeam<GetUserTeamResponseDto>(payload, true);
  }

  async getUserTeams(
    userId: TUserIdFromToken,
  ): Promise<IOperationResult<GetUserTeamResponseDto[]>> {
    const userTeam = await this.prismaService.team.findMany({
      where: {
        TeamMembership: {
          some: {
            userId: Number(userId),
          },
        },
      },
    });

    if (!userTeam || userTeam.length === 0) {
      Operation.notFoundError({ message: 'The team does not exist' });
    }

    return Operation.success<GetUserTeamResponseDto[]>({
      result: userTeam,
    });
  }

  async createUserTeam(
    userId: TUserIdFromToken,
    createUserBody: CreateOrEditUserTeamPayloadDto,
  ): Promise<IOperationResult<CreateUserOrEditTeamResponseDto>> {
    const existingTeam = await this.prismaService.team.findFirst({
      where: {
        teamId: createUserBody.teamId,
      },
    });

    if (existingTeam) {
      return Operation.error({
        message: 'Team ID must be unique. The provided teamId already exists.',
      });
    }

    const team = await this.prismaService.team.create({
      data: {
        ...createUserBody,
        TeamMembership: {
          create: {
            userId: Number(userId),
            status: 'ACTIVE',
            role: DEFAULT_TEAM_ROLE.OWNER,
            accessList: DEFAULT_TEAM_ROLL_ACCESS.TEAM_OWNER,
          },
        },
      },
    });

    return Operation.success({
      message: 'Team created successfully.',
      result: team,
    });
  }

  async editUserTeam(
    payload: SingleTeamPayloadDto,
    editUserBody: CreateOrEditUserTeamPayloadDto,
  ): Promise<IOperationResult<CreateUserOrEditTeamResponseDto>> {
    await this.findUserTeam(payload, false);

    const existingTeam = await this.prismaService.team.findFirst({
      where: {
        teamId: editUserBody.teamId,
      },
    });

    if (existingTeam) {
      return Operation.error({
        message: 'Team ID must be unique. The provided teamId already exists.',
      });
    }

    const updatedTeam = await this.prismaService.team.update({
      where: {
        id: Number(payload.teamId),
      },
      data: editUserBody,
    });

    return Operation.success({
      message: 'Team updated successfully.',
      result: updatedTeam,
    });
  }

  async deleteUserTeam(
    payload: SingleTeamPayloadDto,
  ): Promise<IOperationResult<null>> {
    await this.findUserTeam<null>(payload, false);

    await this.prismaService.team.delete({
      where: { id: Number(payload.teamId) },
    });

    return Operation.success({
      message: 'Team deleted successfully.',
      result: null,
    });
  }
}
