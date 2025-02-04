import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/services';
import { Operation } from 'src/common/utils/opration';
import { RequestDto } from './dto/request';
import { MembershipPayloadDto } from './dto/request/payload.dto';
import { DEFAULT_ROLES_ID } from 'src/common/constants/defaultRole';
import { UserSpaceService } from '../user-space/space.service';

@Injectable()
export class MembershipService {
  constructor(
    private readonly userSpaceService: UserSpaceService,
    private readonly prismaService: PrismaService,
  ) {}

  async getSpaceMemebers(payload: RequestDto['Payload']) {
    const space = await this.prismaService.space.findUnique({
      where: { id: Number(payload.spaceId) },
      include: {
        spaceMembership: {
          select: {
            id: true,
            userId: true,
            status: true,
            spaceMembershipRole: {
              select: {
                spaceRole: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
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

    if (!space) {
      return Operation.notFoundError({ message: 'Team does not exists!' });
    }

    return Operation.success({
      message: 'Team members retrieved successfully.',
      result: space.spaceMembership.map(
        ({ user, spaceMembershipRole, ...other }) => ({
          ...other,
          ...user,
          roles: spaceMembershipRole.map((role) => role.spaceRole),
        }),
      ),
    });
  }

  async addMemberToSpace(
    { username, roles }: RequestDto['AddMembershipBody'],
    payload: MembershipPayloadDto,
  ) {
    const [space, user] = await Promise.all([
      this.prismaService.space.findUnique({
        where: { id: Number(payload.spaceId) },
      }),
      this.prismaService.user.findFirst({
        where: { username: username },
      }),
    ]);

    if (!space) {
      return Operation.error({ message: 'Space does not exist!' });
    }

    if (!user) {
      return Operation.error({ message: 'Member does not exist!' });
    }

    const parentSpaces = await this.userSpaceService.findAllSpaceParents(
      space.id,
    );
    // Add member to all spaces (current space + parent spaces)
    await this.prismaService.spaceMembership.createMany({
      data: parentSpaces.map((spaceId) => ({
        spaceId: spaceId,
        userId: user.id,
      })),
    });

    const membersId = await this.prismaService.spaceMembership.findMany({
      where: {
        spaceId: {
          in: parentSpaces,
        },
        userId: user.id,
      },
    });

    const mainSpace = membersId.find((membersOfSpace) => {
      return membersOfSpace.spaceId === Number(payload.spaceId);
    });

    const spacesWithoutMainSpace = membersId.filter((membersOfSpace) => {
      return membersOfSpace.spaceId !== Number(payload.spaceId);
    });

    await this.prismaService.spaceMembershipRole.createMany({
      data: spacesWithoutMainSpace.map((member) => ({
        roleId: DEFAULT_ROLES_ID.members,
        spaceMembershipId: member.id,
      })),
    });

    // Add roles to the membership in the current space
    await this.prismaService.spaceMembershipRole.createMany({
      data: roles.map((role) => ({
        roleId: role,
        spaceMembershipId: mainSpace.id,
      })),
    });

    return Operation.success({
      message: 'Member added to the space and its parent spaces successfully',
    });
  }
}
