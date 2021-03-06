import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { PrismaClient } from '@prisma/client';
import { join } from 'path';
import { Context } from './types/context';
import resolvers from './resolvers';

const schema = loadSchemaSync(join(__dirname, '../schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const prisma = new PrismaClient()

const schemaWithResolvers = addResolversToSchema({schema, resolvers });
const server = new ApolloServer({
  schema: schemaWithResolvers,
  context: {
    user: {
      id: 'hoge',
    },
  } as Context
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})
