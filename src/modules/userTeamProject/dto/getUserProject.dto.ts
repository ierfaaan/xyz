import { Project } from '@prisma/client';

export class GetUserProjectResponseDto implements Project {
  name: string;
  createdAt: Date;
  id: number;
  logo: string;
  updatedAt: Date;
  banner: string;
  manifesto: string;
  parentId: number;
  projectId: string;
  slogan: string;
}
