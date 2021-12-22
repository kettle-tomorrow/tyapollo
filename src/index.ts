import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

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

const projects = [
  {
    id: 1,
    title: 'title1'
  },
  {
    id: 2,
    title: 'title2'
  },
  {
    id: 3,
    title: 'title3'
  },
  {
    id: 4,
    title: 'title4'
  },
]

const resolvers = {
	Query: {
    project: (_: any, { id }: { id: number }) => {
      return projects.find(project => project.id == id)
    },
    projects: (_: any, { title }: { title: string }) => {
      return projects.filter(project => project.title.includes(title))
    }
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})
