import { Injectable } from '@nestjs/common';
import {
  CommonAddOrEditMembershipPayloadDto,
  CommonMembershipPayloadDto,
} from './dto/common';
import { PrismaService } from 'src/common/services';
import { Operation } from 'src/common/utils/opration';

type TeamHierarchy = {
  id: number; // شناسه تیم
  parentId: number | null; // شناسه تیم والد (ممکن است NULL باشد برای تیم سطح بالا)
};

@Injectable()
export class MembershipService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTeamMember(
    payload: Omit<CommonMembershipPayloadDto, 'memberUsername'>,
  ) {
    const team = await this.prismaService.team.findUnique({
      where: { id: Number(payload.teamId) },
      include: {
        TeamMembership: {
          select: {
            id: true,
            userId: true,
            status: true,
            parentId: true,
            roleName: true,
            user: {
              select: {
                firstname: true,
                lastname: true,
                avatar: true,
                email: true,
                phone: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (!team) {
      return Operation.notFoundError({ message: 'Team does not exists!' });
    }

    return Operation.success({
      message: 'Team members retrieved successfully.',
      result: team.TeamMembership.map(({ user, ...other }) => ({
        ...other,
        ...user,
      })),
    });
  }

  async addTeamMember(
    {
      accessList: _accessList = [],
      roleName,
      managerUsername,
      username,
    }: CommonAddOrEditMembershipPayloadDto<true>,
    payload: CommonMembershipPayloadDto,
  ) {
    const [team, member] = await Promise.all([
      this.prismaService.team.findUnique({
        where: { id: Number(payload.teamId) },
      }),
      this.prismaService.user.findFirst({
        where: { username: username },
      }),
    ]);

    if (!team) {
      return Operation.notFoundError({ message: 'Team does not exist!' });
    }

    if (!member) {
      return Operation.notFoundError({ message: 'Member does not exist!' });
    }

    const teamsHierarchy = await this.prismaService.$queryRawUnsafe<
      TeamHierarchy[]
    >(`
    WITH RECURSIVE TeamHierarchy AS (
      SELECT id, "parentId"
      FROM "Team"
      WHERE id = ${Number(payload.teamId)}
      UNION ALL
      SELECT t.id, t."parentId"
      FROM "Team" t
      INNER JOIN TeamHierarchy th ON t.id = th."parentId"
    )
    SELECT * FROM TeamHierarchy;
  `);

    if (!teamsHierarchy || teamsHierarchy.length === 0) {
      return Operation.notFoundError({ message: 'Hierarchy not found!' });
    }

    for (const hierarchyTeam of teamsHierarchy) {
      if (managerUsername) {
        const manager = await this.prismaService.user.findFirst({
          where: { username: managerUsername },
        });

        if (!manager) {
          return Operation.notFoundError({
            message: 'Manager does not exist!',
          });
        }

        await this.prismaService.teamMembership.create({
          data: {
            userId: member.id,
            teamId: hierarchyTeam.id,
            parentId: manager.id,
            roleName: roleName,
          },
        });
      } else {
        await this.prismaService.teamMembership.create({
          data: {
            userId: member.id,
            teamId: hierarchyTeam.id,
            roleName: roleName,
          },
        });
      }
    }

    return Operation.success({
      message: 'Member added to the team successfully',
    });
  }

  // async deleteTeamMember(payload: CommonMembershipPayloadDto) {
  //   const [team, teamMember] = await Promise.all([
  //     this.prismaService.team.findUnique({
  //       where: { id: Number(payload.teamId) },
  //     }),
  //     this.prismaService.teamMembership.findFirst({
  //       where: {
  //         userId: Number(payload.memberId),
  //         teamId: Number(payload.teamId),
  //       },
  //     }),
  //   ]);

  //   if (!team) {
  //     return Operation.notFoundError({ message: 'Team does not exist!' });
  //   }

  //   if (!teamMember) {
  //     return Operation.notFoundError({
  //       message: 'Member not found in the team!',
  //     });
  //   }

  //   this.prismaService.teamMembership.delete({
  //     where: {
  //       id: teamMember.id,
  //     },
  //   });

  //   return Operation.success({
  //     message: 'Member removed from the team successfully',
  //   });
  // }
  // async getProjectMembership(
  //   payload: Omit<CommonMembershipPayloadDto, 'memberId'>,
  // ) {
  //   const team = await this.prismaService.team.findUnique({
  //     where: { id: Number(payload.teamId) },
  //     include: {
  //       TeamMembership: true,
  //     },
  //   });

  //   if (!team) {
  //     return Operation.notFoundError({ message: 'Team does not exists!' });
  //   }
  //   const project = await this.prismaService.project.findUnique({
  //     where: { id: Number(payload.projectId) },
  //     include: {
  //       ProjectMembership: true,
  //     },
  //   });

  //   if (!project) {
  //     return Operation.notFoundError({ message: 'Project does not exists!' });
  //   }

  //   return Operation.success({
  //     message: 'Team members retrieved successfully.',
  //     result: project.ProjectMembership,
  //   });
  // }

  // async addProjectMember(
  //   { accessList = [], role }: CommonAddOrEditMembershipPayloadDto<false>,
  //   payload: CommonMembershipPayloadDto,
  // ) {
  //   const [team, member, project] = await Promise.all([
  //     this.prismaService.team.findUnique({
  //       where: { id: Number(payload.teamId) },
  //     }),
  //     this.prismaService.user.findUnique({
  //       where: { id: Number(payload.memberId) },
  //     }),
  //     this.prismaService.project.findUnique({
  //       where: { id: Number(payload.projectId) },
  //     }),
  //   ]);

  //   if (!team) {
  //     return Operation.notFoundError({ message: 'Team does not exist!' });
  //   }

  //   if (!member) {
  //     return Operation.notFoundError({ message: 'Member does not exist!' });
  //   }

  //   if (!project) {
  //     return Operation.notFoundError({ message: 'Project does not exist!' });
  //   }

  //   await this.prismaService.projectMembership.create({
  //     data: {
  //       userId: Number(payload.memberId),
  //       projectId: Number(payload.projectId),
  //     },
  //   });

  //   return Operation.success({
  //     message: 'Member added to the project successfully',
  //   });
  // }

  // async deleteProjectMember(payload: CommonMembershipPayloadDto) {
  //   const [team, project, projectMember] = await Promise.all([
  //     this.prismaService.team.findUnique({
  //       where: { id: Number(payload.teamId) },
  //     }),
  //     this.prismaService.project.findUnique({
  //       where: {
  //         teamId: Number(payload.teamId),
  //         id: Number(payload.projectId),
  //       },
  //     }),
  //     this.prismaService.projectMembership.findFirst({
  //       where: {
  //         userId: Number(payload.memberId),
  //         projectId: Number(payload.projectId),
  //       },
  //     }),
  //   ]);

  //   if (!team) {
  //     return Operation.notFoundError({ message: 'Team does not exist!' });
  //   }

  //   if (!project) {
  //     return Operation.notFoundError({
  //       message: 'Team does not exist!',
  //     });
  //   }

  //   await this.prismaService.projectMembership.delete({
  //     where: {
  //       id: projectMember.id,
  //     },
  //   });

  //   return Operation.success({
  //     message: 'Member removed from the Project successfully',
  //   });
  // }
}
