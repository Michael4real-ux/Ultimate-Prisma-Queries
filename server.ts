import  connectDB, { prisma} from './connectDB'

// ConnectDB
connectDB()

async function main() {
  // Inserting a New Record

  // const user = await prisma.user.create({
  //   data: {
  //     name: 'John Doe',
  //     email: 'johndoe@gmail.com',
  //     password: '123456',
  //     photo: 'default.jpg',
  //     role: 'user',
  //     provider: 'local',
  //     verified: true,
  //     userPreference: {
  //       create: {
  //         emailUpdates: true,
  //         preference: 'all',
  //       },
  //     },
  //   },
  //   include: { userPreference: true },
  // });

  // console.log(user);

  //Inserting Multiple Records
  // const numberOfUsers = await prisma.user.createMany({
  //   data: [
  //     {
  //       name: 'Jane Doe',
  //       email: 'janedoe@gmail.com',
  //       password: '123456',
  //       photo: 'default.jpg',
  //       role: 'user',
  //       provider: 'local',
  //       verified: true,
  //     },
  //     {
  //       name: 'Micheal Smith',
  //       email: 'michealsmith@gmail.com',
  //       password: '123456',
  //       photo: 'default.jpg',
  //       role: 'admin',
  //       provider: 'google',
  //       verified: true,
  //     },
  //   ],
  // });

  // console.log(`Created ${numberOfUsers.count} users`);

  //Query All Records
  // const users = await prisma.user.findMany({
  //   where: {
  //     OR: [{ verified: true }, { provider: 'local' }],
  //     email: { contains: '@gmail.com' },
  //     AND: [{ verified: true }, { provider: 'local' }],
  //   },
  //   select: {
  //     id: true,
  //     email: true,
  //     name: true,
  //     verified: true,
  //     provider: true,
  //     createdAt: true,
  //     updatedAt: true,
  //   },
  //   skip: 0,
  //   take: 10,
  //   orderBy: {
  //     createdAt: 'desc',
  //   },
  // });

  // console.log(users);

 // Query a Single Record
  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: '4408632e-1be5-4b07-b6b8-bee2e9ef1a40',
  //   },
  //   select: {
  //     id: true,
  //     name: true,
  //     email: true,
  //     password: true,
  //     createdAt: true,
  //     updatedAt: true,
  //   },
  // });

  // console.log(user);

  //Update a Record
  // const updatedUser = await prisma.user.update({
  //   where: {
  //     email: 'michealsmith@gmail.com',
  //   },
  //   data: {
  //     name: 'Alexander Smith',
  //     email: 'alexandersmith@gmail.com',
  //   },
  //   select: {
  //     id: true,
  //     name: true,
  //     email: true,
  //     password: true,
  //     createdAt: true,
  //   },
  // });

  // console.log(updatedUser);

  //Update Multiple Records
  // const numberOfUpdatedUsers = await prisma.user.updateMany({
  //   where: {
  //     OR: [{ name: 'John Doe' }, { name: 'Jane Doe' }],
  //   },
  //   data: {
  //     verified: true,
  //   },
  // });

  // console.log(`Updated ${numberOfUpdatedUsers.count} users`);

  //Delete Multiple Records
  // const numberOfDeletedUsers = await prisma.user.deleteMany({
  //   where: {
  //     verified: { equals: true },
  //   },
  // });

  // console.log(`${numberOfDeletedUsers.count} users deleted`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
