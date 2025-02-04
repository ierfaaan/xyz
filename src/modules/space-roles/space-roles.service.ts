import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import { Operation } from 'src/common/utils/opration';
import { UserSpaceService } from '../user-space/space.service';
import { SpaceRolesDto } from './dto';
import { DEFAULT_ROLES_ID } from 'src/common/constants/defaultRole';

@Injectable()
export class SpaceRolesService {
  constructor(
    private readonly userSpaceService: UserSpaceService,
    private readonly prismaService: PrismaService,
  ) {}
  async findAllSpaceRoles({
    spaceId,
    userId,
  }: SpaceRolesDto['SpaceRolePayload']) {
    const space = await this.prismaService.space.findFirst({
      where: {
        id: Number(spaceId),
        spaceMembership: {
          some: {
            userId: Number(userId),
          },
        },
      },
    });

    if (!space) {
      return Operation.notFoundError({ message: 'The space does not exist' });
    }

    const parentSpaceIds = await this.userSpaceService.findAllSpaceParents(
      Number(spaceId),
    );

    const spaceRoles = await this.prismaService.spaceRole.findMany({
      where: {
        OR: [
          {
            spaceId: { in: parentSpaceIds },
          },
          {
            spaceId: null,
          },
        ],
      },

      select: {
        name: true,
        id: true,
        parentId: true,
      },
    });

    return Operation.success({
      message: 'Team roles retrieved successfully.',
      result: spaceRoles,
    });
  }

  async findSpaceRole({
    spaceId,
    userId,
    roleId,
  }: SpaceRolesDto['SpaceRolePayload']) {
    const space = await this.prismaService.space.findUnique({
      where: {
        id: Number(spaceId),
        spaceMembership: {
          some: {
            userId: Number(userId),
          },
        },
      },
    });

    if (!space) {
      Operation.notFoundError({ message: 'The space does not exist' });
    }

    if (!roleId) {
      return Operation.error({ message: `roleId is required!` });
    }

    const parentSpaceIds = await this.userSpaceService.findAllSpaceParents(
      Number(spaceId),
    );

    // need CTE for find uniq role
    const role = await this.prismaService?.spaceRole.findUnique({
      where:
        Number(roleId) === DEFAULT_ROLES_ID.founder ||
        Number(roleId) === DEFAULT_ROLES_ID.members
          ? {
              id: Number(roleId),
            }
          : {
              spaceId: {
                in: parentSpaceIds,
              },
              id: Number(roleId),
            },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    if (!role)
      return Operation.notFoundError({
        message: `role with id ${Number(roleId)} notfound!`,
      });

    const roleActions = await this.prismaService?.spaceRoleActions.findMany({
      where: {
        roleId: role.id,
      },
      select: {
        spaceAction: {
          select: {
            id: true,
            action: true,
          },
        },
      },
    });

    const roleMembers = await this.prismaService?.spaceMembershipRole.findMany({
      where: {
        roleId: role.id,
        spaceMembership: {
          spaceId: Number(spaceId),
        },
      },
      select: {
        spaceMembership: {
          select: {
            user: {
              select: {
                firstname: true,
                lastname: true,
                avatar: true,
                id: true,
              },
            },
          },
        },
      },
    });

    return Operation.success({
      result: {
        ...role,
        actions: roleActions.map((action) => action.spaceAction),
        members: roleMembers.map((item) => item.spaceMembership.user),
      },
      message: 'role has been received successfully!',
    });
  }

  async createSpaceRole(
    { spaceId, userId }: SpaceRolesDto['SpaceRolePayload'],
    {
      name,
      spaceActionsId,
      parentRoleId,
      description,
    }: SpaceRolesDto['CreateSpaceRoleBody'],
  ) {
    const userSpace = await this.prismaService.space.findUnique({
      where: {
        id: Number(spaceId),
        spaceMembership: {
          some: {
            userId: Number(userId),
          },
        },
      },
    });

    if (!userSpace) {
      return Operation.notFoundError({ message: 'The Space does not exist' });
    }

    if (!userSpace.canCreateRoles) {
      return Operation.error({
        message: 'This Space does not have permission to create roles.',
      });
    }

    const spaceRole = await this.prismaService.spaceRole.create({
      data: {
        name: name,
        description,
        spaceId: Number(spaceId),
        parentId: parentRoleId,
      },
    });

    await this.prismaService.spaceRoleActions.createMany({
      data: spaceActionsId?.map((actionId) => ({
        actionId: actionId,
        roleId: spaceRole.id,
      })),
    });

    return Operation.success({
      message: 'Space Role Created successfully.',
      result: null,
    });
  }
}
