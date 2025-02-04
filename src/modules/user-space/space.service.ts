import { Injectable } from '@nestjs/common';
import { IOperationResult } from 'src/common/types/HttpResponse';
import { Operation } from 'src/common/utils/opration';
import { PrismaService } from 'src/common/services';
import { UserSpaceDto } from './dto';
import { IUserSpaceModel } from './model';
import { DEFAULT_ROLES_ID } from 'src/common/constants/defaultRole';

@Injectable()
export class UserSpaceService {
  constructor(private readonly prismaService: PrismaService) {}

  async exsitUserSpace<T>(
    { userId, spaceId }: UserSpaceDto['SpacePayload'],
    returnSuccessResult: boolean = false,
  ): Promise<IOperationResult<T>> {
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

    if (returnSuccessResult)
      return Operation.success<T>({ result: userSpace as T });
  }

  async findUserSpace(
    payload: UserSpaceDto['SpacePayload'],
  ): Promise<IOperationResult<IUserSpaceModel>> {
    return this.exsitUserSpace<IUserSpaceModel>(payload, true);
  }

  async findSpaceRelated(
    userId: UserSpaceDto['SpacePayload']['userId'],
    spaceId: UserSpaceDto['SpacePayload']['spaceId'],
    usersTeamsOnly: boolean,
  ) {
    const spaceIds: { id: number }[] = await this.prismaService.$queryRaw`
      WITH RECURSIVE SpaceHierarchy AS (
          SELECT id FROM "Space" WHERE id = ${Number(spaceId)}
          UNION ALL
          SELECT s.id FROM "Space" s
          INNER JOIN SpaceHierarchy sh ON s."parentId" = sh.id
      )
      SELECT id FROM SpaceHierarchy;
`;

    const spaceIdList = new Set([
      Number(spaceId),
      ...spaceIds.map((item) => item.id),
    ]);

    const result = await this.prismaService.space.findMany({
      where: {
        id: { in: Array.from(spaceIdList) },
        ...(usersTeamsOnly && {
          spaceMembership: { some: { userId: Number(userId) } },
        }),
      },
      include: {
        Announcements: {
          select: {
            id: true,
          },
        },
        spaceMembership: {
          select: {
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
          },
        },
      },
    });

    if (!result || result.length === 0) {
      Operation.notFoundError({ message: 'The space does not exist' });
    }

    return Operation.success({
      result: result.map(({ spaceMembership, Announcements, ...other }) => {
        return {
          ...other,
          announcements: Announcements,
          roles: spaceMembership[0]?.spaceMembershipRole.map(
            (teamMemberRole) => {
              return teamMemberRole.spaceRole;
            },
          ),
        };
      }),
    });
  }

  async findAllSpace(userId: UserSpaceDto['SpacePayload']['userId']) {
    const space = await this.prismaService.space.findMany({
      where: {
        spaceMembership: {
          some: {
            userId: Number(userId),
          },
        },
      },
      include: {
        Announcements: {
          select: {
            id: true,
          },
        },
        spaceMembership: {
          select: {
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
          },
        },
      },
    });

    if (!space || space.length === 0) {
      Operation.notFoundError({ message: 'The space does not exist' });
    }

    return Operation.success({
      result: space.map(({ spaceMembership, Announcements, ...other }) => {
        return {
          ...other,
          announcements: Announcements,
          roles: spaceMembership[0].spaceMembershipRole.map(
            (teamMemberRole) => {
              return teamMemberRole.spaceRole;
            },
          ),
        };
      }),
    });
  }

  async createUserSpace(
    userId: UserSpaceDto['SpacePayload']['userId'],
    createUserBody: UserSpaceDto['CreateUserSpaceBody'],
  ) {
    if (createUserBody.spaceId) {
      const existingSpace = await this.prismaService.space.findFirst({
        where: {
          spaceId: createUserBody.spaceId,
        },
      });

      if (existingSpace) {
        return Operation.error({
          message:
            'Space ID must be unique. The provided spaceId already exists.',
        });
      }
    }

    const space = await this.prismaService.space.create({
      data: {
        ...createUserBody,
        spaceMembership: {
          create: {
            userId: Number(userId),
            status: 'ACTIVE',
            spaceMembershipRole: {
              create: {
                roleId: DEFAULT_ROLES_ID.founder,
              },
            },
          },
        },
      },
      include: {
        spaceMembership: true,
      },
    });

    return Operation.success({
      message: 'Space created successfully.',
      result: space,
    });
  }

  async updateUserSpace(
    payload: UserSpaceDto['SpacePayload'],
    updateUserBody: UserSpaceDto['UpdateUserSpaceBody'],
  ) {
    await this.exsitUserSpace(payload);
    const result = await this.prismaService.space.update({
      where: {
        id: Number(payload.spaceId),
      },
      data: updateUserBody,
    });
    return Operation.success({
      result,
      message: 'Space has been updated successfully!',
    });
  }

  async findAllRelatedSpaces(
    spaceId: number,
  ): Promise<{ id: number; name: string }[]> {
    return await this.prismaService.$queryRaw`
      WITH RECURSIVE space_tree AS (
        SELECT id, name, "parentId"
        FROM "Space"
        WHERE id = ${Number(spaceId)}
        UNION ALL
        SELECT s.id, s.name, s."parentId"
        FROM "Space" s
        INNER JOIN space_tree st ON s."parentId" = st.id
      )
      SELECT id, name FROM space_tree;
    `;
  }

  async findAllSpaceParents(spaceId: number): Promise<number[]> {
    const spaceIds = await this.prismaService.$queryRaw<{ id: number }[]>`
    WITH RECURSIVE SpaceHierarchy AS (
      SELECT id, "parentId" FROM "Space" WHERE id = ${spaceId}
      UNION ALL
      SELECT s.id, s."parentId" FROM "Space" s
      INNER JOIN SpaceHierarchy sh ON s.id = sh."parentId"
    )
    SELECT id FROM SpaceHierarchy;
  `;
    return spaceIds.map((space) => space.id);
  }

  async deleteUserSpace(payload: UserSpaceDto['SpacePayload']) {
    await this.exsitUserSpace(payload);

    await this.prismaService.space.delete({
      where: {
        id: Number(payload.spaceId),
      },
    });
    return Operation.success({
      result: null,
      message: 'Space has beed deleted Successfully!',
    });
  }
}
