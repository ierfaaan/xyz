import { Team } from '@prisma/client';

export class GetUserTeamResponseDto implements Team {
  banner: string | null;
  createdAt: Date;
  id: number;
  logo: string | null;
  manifesto: string | null;
  name: string;
  parentId: number | null;
  slogan: string | null;
  teamId: string;
  updatedAt: Date;
  roleName: string;
}
