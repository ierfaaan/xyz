export interface IUserSpaceModel {
  banner: string | null;
  createdAt: Date;
  id: number;
  logo: string | null;
  manifesto: string | null;
  name: string;
  slogan: string | null;
  teamId: string;
  updatedAt: Date;
  parentId: number;
  roles: { name: string; id: number }[];
}
