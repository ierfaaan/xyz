import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import { UserProfilePayloadDto } from './dto/paylod.dto';
import { Operation } from 'src/common/utils/opration';
import { UserSpaceService } from '../user-space/space.service';

@Injectable()
export class UserProfileService {
  constructor(
    private readonly userSpaceService: UserSpaceService,
    private readonly prismaService: PrismaService,
  ) {}

  async findUserProfile(payload: UserProfilePayloadDto) {
    const result = await this.prismaService.user.findUnique({
      where: {
        id: Number(payload.userId),
      },
      select: {
        firstname: true,
        lastname: true,
        phone: true,
        email: true,
        avatar: true,
        username: true,
      },
    });
    return Operation.success({
      result,
      message: 'user profile has beedn received successfully!',
    });
  }

  async findUserTeams({ userId, spaceId }: UserProfilePayloadDto) {
    // Step 1: Find all spaces related to the root of the given spaceId
    const relatedSpaces =
      await this.userSpaceService.findAllRelatedSpaces(spaceId);

    // // Step 2: Filter spaces where the user is a member
    const userSpaces = await this.prismaService.spaceMembership.findMany({
      where: {
        userId: Number(userId),
        spaceId: {
          in: relatedSpaces.map((space) => space.id),
        },
      },
      include: {
        space: true,
        spaceMembershipRole: {
          include: {
            spaceRole: {
              include: {
                spaceRoleActions: {
                  include: {
                    spaceAction: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return Operation.success({
      result: userSpaces
        .filter((item) => item.space.type === 'TEAM')
        .map((item) => ({
          name: item.space.name,
          id: item.space.id,
          parentId: item.space.parentId,
          slogan: item.space.slogan,
          logo: item.space.logo,
          roles: item.spaceMembershipRole.map((role) => ({
            id: role.spaceRole.id,
            description: role.spaceRole.description,
            name: role.spaceRole.name,
            actions: role.spaceRole.spaceRoleActions.map((roleAction) => ({
              action: roleAction.spaceAction.action,
              id: roleAction.spaceAction.id,
            })),
          })),
        })),
    });
  }

  async findUserProjects() {}
}
