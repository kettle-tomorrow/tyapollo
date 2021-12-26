import { Resolvers } from "../types/generated/graphql";
import * as mutation from "./mutation/"

const resolvers: Resolvers = {
  Query: {
    getUser: () => null,
    getProjects: () => [],
    getProjectByID: () => null
  },
  Mutation: mutation
}

export default resolvers;