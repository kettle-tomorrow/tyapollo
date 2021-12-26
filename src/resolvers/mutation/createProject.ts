import { prisma } from "../../lib/prisma";
import { MutationResolvers } from "../../types/generated/graphql";

export const createProject: MutationResolvers['createProject'] = async (
  parent,
  args,
  context,
  info
) => {
  const userId = context.user?.id;
  if (!userId) {
    throw new Error('Authentication Error.');
  }
  const project = await prisma.project.create({
    data: {
      title: args.input.title,
      status: 'pending',
      userId: userId
    },
    include: {
      user: true
    }
  })
  return project
}