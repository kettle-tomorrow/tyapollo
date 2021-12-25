import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient;

const main = async () => {
  const users = await createUsers();
  const promises = users.map((user) => {
    return createProjects(user);
  })
  const projects = await Promise.all(promises);
  console.log(users, projects)
}

const createUsers = async () => {
  const promises = [...Array(3)].map((_, i) => {
    const userId = `${i + 1}`;
    return prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        name: `seed_user_${userId}`,
      }
    })
  })
  return await Promise.all(promises)
}

const createProjects = async (user: User) => {
  const promises = [...Array(3)].map( (_, i)=> {
    const number = i + 1
    return prisma.project.create({
      data: {
        title: `${user.name}_project_${number}_title`,
        userId: user.id
      }
    })
  })
  return await Promise.all(promises)
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })