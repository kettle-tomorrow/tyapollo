import { prisma } from "../../lib/prisma";
import { MutationResolvers } from "../../types/generated/graphql";

export const updateProject: MutationResolvers['updateProject'] = async (
  parent,
  args,
  context,
  info
) => {
  const userId = context.user?.id;
  if (!userId) {
    throw new Error('Authentication Error.');
  }
  const project = prisma.project.update({
    where: {
      id: args.id
    },
    data: {
      title: args.input.title,
      status: args.input.status,
    }
  })
  return project
}