import { Team } from '@prisma/client';

export class GetUserTeamResponseDto implements Team {
  banner: string;
  createdAt: Date;
  id: number;
  logo: string;
  manifesto: string;
  name: string;
  parentId: number;
  slogan: string;
  teamId: string;
  updatedAt: Date;
}
