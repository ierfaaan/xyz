import { Team, Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrEditUserTeamPayloadDto implements Prisma.TeamCreateInput {
  @IsNotEmpty({ message: 'team name is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'team name is required' })
  @IsString()
  teamId?: string;

  logo?: string;
  banner?: string;
  slogan?: string;
  manifesto?: string;
}

export type CreateUserOrEditTeamResponseDto = Team;
