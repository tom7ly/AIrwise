import { ApolloServer } from '@apollo/server';
import { importSchemasAndResolversApollo } from './getSchemas';
import { startStandaloneServer } from '@apollo/server/standalone';

export async function initApollo() {
  const { schema, resolvers } = await importSchemasAndResolversApollo();

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    // ...other Apollo Server options
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  });
  
  console.log(`🚀 Server ready at ${url}`);
}
