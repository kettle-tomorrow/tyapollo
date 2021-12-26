import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getProjects: QueryResolvers['getProjects'] = async (
  parent,
  args,
  context,
  info
) => {
  const projects = prisma.project.findMany({
    where: {
      userId: context.user?.id
    },
    include: {
      user: true
    }
  })
  return projects
}