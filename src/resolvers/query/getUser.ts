import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getUser: QueryResolvers['getUser'] = async (
  parent,
  args,
  context,
  info
) => {
  const user = prisma.user.findUnique({
    where: {
      id: context.user?.id
    }
  })
  return user
}