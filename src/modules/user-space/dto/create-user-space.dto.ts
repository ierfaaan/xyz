import { $Enums } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserSpaceBodyDto {
  @IsNotEmpty({ message: 'space name is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'space id cannot be empty.' })
  @IsString()
  @IsOptional()
  spaceId?: string;

  parentId?: number;

  type?: $Enums.SpaceType;

  logo?: string;
  banner?: string;
  slogan?: string;
  manifesto?: string;

  canCreateRoles?: boolean;
}
