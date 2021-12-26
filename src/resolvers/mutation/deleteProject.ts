import { prisma } from "../../lib/prisma";
import { MutationResolvers } from "../../types/generated/graphql";

export const deleteProject: MutationResolvers['deleteProject'] = async (
  parent,
  args,
  context,
  info
) => {
  const userId = context.user?.id;
  if (!userId) {
    throw new Error('Authentication Error.');
  }
  const project = await prisma.project.delete({
    where: {
      id: args.id
    },
    include: {
      user: true
    }
  })
  return project
}