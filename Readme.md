## BASIC COMANDS
- Initialize a Node.js TypeScript Project
  yarn init

-Next, install these dependencies to add TypeScript to the Node.js project:
yarn add -D typescript ts-node-dev @types/node && yarn tsc --init

- Set up Prisma
yarn add -D prisma

- After that, run the Prisma init command to initialize the Prisma schema:
yarn prisma init --datasource-provider postgresql

- sample .env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123
POSTGRES_DB=explore-prisma
DATABASE_URL="postgresql://postgres:password123@localhost:6500/explore-prisma?schema=public"

- After configuring your schema 
Run the Database Migration with Prisma
Before that, install the Prisma Client library:

yarn add @prisma/client

- Run the following command to create the PostgreSQL database and the table.
yarn prisma migrate dev --name init

- package.json
{
 "scripts": {
    "db:migrate": "npx prisma migrate dev --name user-entity --create-only && npx prisma generate",
    "db:push": "npx prisma db push"
  }
}

-Run this command to generate the migration file and push the changes to the database.
yarn db:migrate && yarn db:push

- Run this command to start the application:
  yarn start

- Run the app with this command:
yarn ts-node-dev --transpile-only server.ts

- The following command will generate the migration file and the TypeScript types without applying the schema changes.
yarn prisma migrate dev --name added-more-entities --create-only && yarn prisma generate

- The command below will push the schema to the database
yarn prisma db push

- Prisma also comes with a GUI that you can use to view and mutate data in the database. To access the Prisma studio, you need to run this command in the terminal:
yarn prisma studio

## BASIC SAMPLE AND CRUD
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       String   @id @default(uuid())
  // id Int @id @default(autoincrement())
  name     String   @db.VarChar(255)
  email    String   @unique
  photo    String?  @default("default.png")
  verified Boolean? @default(false)

  password  String
  role      RoleEnumType? @default(user)
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt
  provider  String?

  preferences Json

  // block level attributes
  @@unique([email, name])
  @@index([email])
  @@map(name: "users")
}

enum RoleEnumType {
  user
  admin
}

 - CRUD(create, read, update,delete)
import  connectDB, { prisma} from './connectDB'

// ConnectDB
connectDB()

async function main() {
   // Insert a single user

//    const user = await prisma.user.create({
//        data:{
//            name:"John Doe",
//            email:"jogndoe@gmail.com"
//        }
//    })
//    console.log(JSON.stringify(user,undefined, 2))
 
 // Insert multiple users
// const numberOfUsers = await prisma.user.createMany({
//     data: [
//       {
//         name: 'Jane Doe',
//         email: 'janedoe@gmail.com',
//       },
//       {
//         name: 'Jack Doe',
//         email: 'jackdoe@gmail.com',
//       },
//       {
//         name: 'Jill Doe',
//         email: 'jilldoe@gmail.com',
//       },
//     ],
//   });

   // Find a single user
//    const uniqueUser = await prisma.user.findUnique({
//     where: {
//       id: user.id,
//     },
//   });

  // Find all users
//   const allUsers = await prisma.user.findMany();
//   console.log(allUsers)

  // Update a single user
//   const updatedUser = await prisma.user.update({
//     where: {
//       id: user.id,
//     },
//     data: {
//       name: 'Prince Doe',
//     },
//   });

  // Update multiple users
//   const numberOfUpdatedUsers = await prisma.user.updateMany({
//     where: {
//       OR: [{ id: 2 }, { id: 3 }],
//     },
//     data: {
//       name: 'Micheal Doe',
//     },
//   });
//   console.log(numberOfUpdatedUsers)

 // Delete a single user
//  await prisma.user.delete({
//     where: {
//       id: user.id,
//     },
//   });

  // Delete all users
//   const numberOfDeleteUsers = await prisma.user.deleteMany({});
//   console.log(`${numberOfDeleteUsers.count} users deleted`);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })



### ONE TO ONE RELATIONSHIP
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       String   @id @default(uuid())
  // id Int @id @default(autoincrement())
  name     String   @db.VarChar(255)
  email    String   @unique
  photo    String?  @default("default.png")
  verified Boolean? @default(false)

  password  String
  role      RoleEnumType? @default(user)
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt
  provider  String?

  writtenPosts  Post[] @relation("writtenPosts")
  favoritePosts Post[] @relation("favoritePosts")

  userPreference   UserPreference? @relation(fields: [userPreferenceId], references: [id])
  userPreferenceId String?         @unique

  @@map(name: "users")
}

enum RoleEnumType {
  user
  admin
}

model UserPreference {
  id           String  @id @default(uuid())
  emailUpdates Boolean @default(false)
  user         User?
  preference   String

  @@map(name: "userpreferences")
}

### ONE TO MANY RELATIONSHIP

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       String   @id @default(uuid())
  // id Int @id @default(autoincrement())
  name     String   @db.VarChar(255)
  email    String   @unique
  photo    String?  @default("default.png")
  verified Boolean? @default(false)

  password  String
  role      RoleEnumType? @default(user)
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt
  provider  String?

  preferences Json

  posts Post[]

  @@map(name: "users")
}

enum RoleEnumType {
  user
  admin
}

model Post {
  id        String   @id @default(uuid())
  title     String   @db.VarChar(255)
  content   String
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map(name: "posts")
}

## Multiple One-to-Many Relationships

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       String   @id @default(uuid())
  // id Int @id @default(autoincrement())
  name     String   @db.VarChar(255)
  email    String   @unique
  photo    String?  @default("default.png")
  verified Boolean? @default(false)

  password  String
  role      RoleEnumType? @default(user)
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt
  provider  String?

  preferences Json

  writtenPosts  Post[] @relation("writtenPosts")
  favoritePosts Post[] @relation("favoritePosts")

  @@map(name: "users")
}

enum RoleEnumType {
  user
  admin
}

model Post {
  id            String   @id @default(uuid())
  title         String   @db.VarChar(255)
  content       String
  published     Boolean  @default(false)
  authorId      String
  favoritedById String?
  author        User     @relation("writtenPosts", fields: [authorId], references: [id])
  favoritedBy   User?    @relation("favoritePosts", fields: [favoritedById], references: [id])
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@map(name: "posts")
}




## Many-to-Many Relationships
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       String   @id @default(uuid())
  // id Int @id @default(autoincrement())
  name     String   @db.VarChar(255)
  email    String   @unique
  photo    String?  @default("default.png")
  verified Boolean? @default(false)

  password  String
  role      RoleEnumType? @default(user)
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt
  provider  String?

  preferences Json

  writtenPosts  Post[] @relation("writtenPosts")
  favoritePosts Post[] @relation("favoritePosts")

  @@map(name: "users")
}

enum RoleEnumType {
  user
  admin
}

model Post {
  id            String   @id @default(uuid())
  title         String   @db.VarChar(255)
  content       String
  image         String
  published     Boolean  @default(false)
  authorId      String
  favoritedById String?
  author        User     @relation("writtenPosts", fields: [authorId], references: [id])
  favoritedBy   User?    @relation("favoritePosts", fields: [favoritedById], references: [id])
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  categories Category[]

  @@map(name: "posts")
}

model Category {
  id        String   @id @default(uuid())
  tilte     String   @db.VarChar(255)
  slug      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts Post[]

  @@map(name: "categories")
}


### ALL RELATIONSHIPS SAMPLE
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       String   @id @default(uuid())
  // id Int @id @default(autoincrement())
  name     String   @db.VarChar(255)
  email    String   @unique
  photo    String?  @default("default.png")
  verified Boolean? @default(false)

  password  String
  role      RoleEnumType? @default(user)
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt
  provider  String?

  writtenPosts  Post[] @relation("writtenPosts")
  favoritePosts Post[] @relation("favoritePosts")

  userPreference   UserPreference? @relation(fields: [userPreferenceId], references: [id])
  userPreferenceId String?         @unique

  @@map(name: "users")
}

enum RoleEnumType {
  user
  admin
}

model UserPreference {
  id           String  @id @default(uuid())
  emailUpdates Boolean @default(false)
  user         User?
  preference   String

  @@map(name: "userpreferences")
}

model Post {
  id            String   @id @default(uuid())
  title         String   @db.VarChar(255)
  content       String
  image         String
  published     Boolean  @default(false)
  authorId      String
  favoritedById String?
  author        User     @relation("writtenPosts", fields: [authorId], references: [id])
  favoritedBy   User?    @relation("favoritePosts", fields: [favoritedById], references: [id])
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  categories Category[]

  @@map(name: "posts")
}

model Category {
  id        String   @id @default(uuid())
  tilte     String   @db.VarChar(255)
  slug      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts Post[]

  @@map(name: "categories")
}

