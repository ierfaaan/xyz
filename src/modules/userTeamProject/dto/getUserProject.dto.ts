import { Project } from '@prisma/client';

export class GetUserProjectResponseDto implements Project {
  id: number;
  projectId: string;
  name: string | null;
  teamId: number;
  createdAt: Date;
  logo: string | null;
  updatedAt: Date;
  banner: string | null;
  manifesto: string | null;
  parentId: number;
  slogan: string | null;
}
