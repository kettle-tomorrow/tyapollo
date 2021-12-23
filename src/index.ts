import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const typeDefs = gql`
  type Project {
    id: Int!
    title: String
  }
  type Query {
		project(id: Int): Project
    projects(title: String): [Project]
	}
`;

const resolvers = {
	Query: {
    project: (_: any, { id }: { id: number }) => {
      return prisma.project.findUnique({
        where: {
          id: id
        }
      });
    },
    projects: (_: any, { title }: { title: string }) => {
      return prisma.project.findMany({
        where: {
          title: title
        }
      });
    }
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})
