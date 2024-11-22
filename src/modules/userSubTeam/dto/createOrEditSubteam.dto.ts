import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrEditSubTeamPayloadDto implements Prisma.TeamCreateInput {
  @IsNotEmpty({ message: 'team name is required' })
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsNotEmpty({ message: 'team name is required' })
  @IsString()
  teamId?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  banner?: string;

  @IsOptional()
  @IsString()
  slogan?: string;

  @IsOptional()
  @IsString()
  manifesto?: string;
}
