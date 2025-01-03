import { Team, Prisma } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserTeamPayloadDto implements Prisma.TeamCreateInput {
  @IsNotEmpty({ message: 'team name is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'team id cannot be empty.' })
  @IsString()
  @IsOptional()
  teamId?: string;

  logo?: string;
  banner?: string;
  slogan?: string;
  manifesto?: string;
}

export class EditUserTeamPayloadDto implements Prisma.TeamCreateInput {
  @IsNotEmpty({ message: 'team name is required' })
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty({ message: 'team id cannot be empty.' })
  @IsString()
  @IsOptional()
  teamId?: string;

  logo?: string;
  banner?: string;
  slogan?: string;
  manifesto?: string;
}

export type CreateUserOrEditTeamResponseDto = Team;
