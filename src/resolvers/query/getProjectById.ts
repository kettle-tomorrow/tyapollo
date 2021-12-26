import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getProjectById: QueryResolvers['getProjectById'] = async(
  parent,
  args,
  context,
  info
) => {
  const project = await prisma.project.findUnique({
    where: {
      id: args.id
    },
    include: {
      user: true
    }
  })
  if (!project) {
    throw new Error('Not Found Todo.');
  }
  return { ...project };
}