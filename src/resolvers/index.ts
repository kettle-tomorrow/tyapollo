import { Resolvers } from "../types/generated/graphql";
import * as mutation from "./mutation/"
import * as query from "./query"

const resolvers: Resolvers = {
  Query: query,
  Mutation: mutation
}

export default resolvers;