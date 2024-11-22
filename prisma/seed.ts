import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as bcrypyt from 'bcrypt';

const prisma = new PrismaClient();

dotenv.config();

async function main() {
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
