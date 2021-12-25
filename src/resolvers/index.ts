import { Resolvers } from "../types/generated/graphql";
import { createUser } from "./createUser";

const resolvers: Resolvers = {
  Query: {
    getUser: () => null,
    getProjects: () => [],
    getProjectByID: () => null
  },
  Mutation: {
    createProject: () => null,
    updateProject: () => null,
    deleteProject: () => null,
    createUser: createUser,
    updateUser: () => null
  }
}

export default resolvers;