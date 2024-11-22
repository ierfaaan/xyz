import { Injectable } from '@nestjs/common';
import { CommonUserSubTeamPayloadDto } from './dto/common';
import { PrismaService } from 'src/common/services';
import {
  DEFAULT_TEAM_ROLE,
  DEFAULT_TEAM_ROLL_ACCESS,
} from 'src/common/constants/defaultRole';
import { Operation } from 'src/common/utils/opration';
import { CreateOrEditSubTeamPayloadDto } from './dto/createOrEditSubteam.dto';

@Injectable()
export class UserSubTeamService {
  constructor(private readonly prismaService: PrismaService) {}

  private async findSubTeam<T>(
    payload: CommonUserSubTeamPayloadDto,
    returnSuccessResult: boolean,
  ) {
    const subTeam = this.prismaService.team.findUnique({
      where: {
        id: Number(payload.subTeamId),
        parentId: Number(payload.parentTeamId),
      },
    });

    if (!subTeam)
      return Operation.notFoundError({
        message: 'The sub-team does not exist',
      });

    if (returnSuccessResult)
      return Operation.success<T>({ result: subTeam as T });
  }

  async getUserSubTeam(payload: CommonUserSubTeamPayloadDto) {
    return this.findSubTeam(payload, true);
  }

  async getUserSubTeams(
    payload: Omit<CommonUserSubTeamPayloadDto, 'subTeamId'>,
  ) {
    const subTeams = this.prismaService.team.findMany({
      where: {
        parentId: Number(payload.parentTeamId),
      },
    });

    if (!subTeams)
      return Operation.notFoundError({
        message: 'The sub-team does not exist',
      });

    return Operation.success({ result: subTeams });
  }

  async createUserSubTeam(
    payload: Omit<CommonUserSubTeamPayloadDto, 'subTeamId'>,
    createSubTeamBody: CreateOrEditSubTeamPayloadDto,
  ) {
    const existingTeam = await this.prismaService.team.findFirst({
      where: {
        teamId: payload.parentTeamId,
      },
    });

    if (existingTeam) {
      return Operation.error({
        message: 'Team ID must be unique. The provided teamId already exists.',
      });
    }

    const team = await this.prismaService.team.create({
      data: {
        ...createSubTeamBody,
        parentId: Number(payload.parentTeamId),
        TeamMembership: {
          create: {
            userId: Number(payload.userId),
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

  async editUserSubTeam(
    payload: CommonUserSubTeamPayloadDto,
    editSubTeamBody: CreateOrEditSubTeamPayloadDto,
  ) {
    await this.findSubTeam(payload, false);

    const existingTeam = await this.prismaService.team.findFirst({
      where: {
        teamId: editSubTeamBody.teamId,
      },
    });

    if (existingTeam) {
      return Operation.error({
        message: 'Team ID must be unique. The provided teamId already exists.',
      });
    }

    const updatedTeam = await this.prismaService.team.update({
      where: {
        id: Number(payload.subTeamId),
        parentId: Number(payload.parentTeamId),
      },
      data: editSubTeamBody,
    });

    return Operation.success({
      message: 'Team updated successfully.',
      result: updatedTeam,
    });
  }

  async deleteUserSubTeam(payload: CommonUserSubTeamPayloadDto) {
    await this.findSubTeam(payload, false);

    await this.prismaService.team.delete({
      where: { id: Number(payload.subTeamId) },
    });

    return Operation.success({
      message: 'Team deleted successfully.',
      result: null,
    });
  }
}
