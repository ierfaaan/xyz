import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as bcrypyt from 'bcrypt';
// import { TeamOperations } from '../src/common/constants/operations';

const prisma = new PrismaClient();

dotenv.config();

async function main() {
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      username: 'ierfaaan',
      password: bcrypyt.hashSync('Erfan13771377', 10),
      firstname: 'Erfan',
      lastname: 'Abbasi',
      email: 'ierfaaan@gmail.com',
      phone: '09302640725',
    },
  });
  // const ownerRole = await prisma.role.create({
  //   data: {
  //     id: 1,
  //     name: 'owner',
  //     scope: 'TEAM',
  //   },
  // });
  // await prisma.actions.createMany({
  //   data: Object.values(TeamOperations).map((item) => ({
  //     action: item,
  //     scope: 'TEAM',
  //   })),
  // });

  // const teamActions = await prisma.actions.findMany({
  //   where: {
  //     scope: 'TEAM',
  //   },
  // });

  // await prisma.roleActions.createMany({
  //   data: teamActions.map((item) => {
  //     return {
  //       actionId: item.id,
  //       roleId: ownerRole.id,
  //     };
  //   }),
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
