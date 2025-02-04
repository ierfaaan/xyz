import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as bcrypyt from 'bcrypt';

const prisma = new PrismaClient();

export const FounderActions = [
  {
    id: 0,
    accessLevel: 'ALL',
    title: 'all actions',
    description: 'Allows the user to all actions',
  },
  {
    id: 1,
    accessLevel: 'CREATE_SPACE',
    title: 'create space',
    description: 'Allows the user to create a new space.',
  },
  {
    id: 2,
    accessLevel: 'DELETE_SPACE',
    title: 'delete space',
    description: 'Allows the user to delete an existing space.',
  },
  {
    id: 3,
    accessLevel: 'EDIT_SPACE',
    title: 'edit space',
    description: 'Allows the user to modify the details of an existing space.',
  },
  {
    id: 4,
    accessLevel: 'ADD_MEMBER_TO_SPACE',
    title: 'add member to space',
    description: 'Allows the user to add a new member to a space.',
  },
  {
    id: 5,
    accessLevel: 'REMOVE_MEMBER_FROM_SPACE',
    title: 'delete member from space',
    description: 'Allows the user to remove a member from a space.',
  },
  {
    id: 6,
    accessLevel: 'CREATE_SPACE_ROLE',
    title: 'create space role',
    description: 'Allows the user to create a new role within a space.',
  },
  {
    id: 7,
    accessLevel: 'DELETE_SPACE_ROLE',
    title: 'delete space role',
    description: 'Allows the user to delete an existing role within a space.',
  },
];

dotenv.config();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        username: 'ierfaaan',
        password: bcrypyt.hashSync('Erfan13771377', 10),
        firstname: 'Erfan',
        lastname: 'Abbasi',
        email: 'ierfaaan@gmail.com',
        phone: '09302640725',
      },
      {
        username: 'mari',
        password: bcrypyt.hashSync('mari', 10),
        firstname: 'mari',
        lastname: 'dehghan',
        email: 'mari@gmail.com',
        phone: '09337097271',
      },
    ],
  });

  await prisma.spaceRole.createMany({
    data: [
      {
        id: 1,
        name: 'founder',
        description: 'A person with full access to all team actions.',
      },
      {
        id: 2,
        name: 'member',
        parentId: 1,
        description: 'A person without access',
      },
    ],
  });

  await prisma.spaceActions.createMany({
    data: FounderActions.map((item) => ({
      action: item.accessLevel,
      name: item.title,
      id: item.id,
      description: item.description,
    })),
  });

  await prisma.spaceRoleActions.createMany({
    data: FounderActions.map((action) => ({
      roleId: 1,
      actionId: action.id,
    })),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
