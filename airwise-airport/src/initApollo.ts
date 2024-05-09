import { ApolloServer } from '@apollo/server';
import { importSchemasAndResolvers } from "./getSchemas";
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { gql } from 'graphql-request';
import { parse } from 'graphql';

export async function initApollo() {
  const { schema, resolvers } = await importSchemasAndResolvers();

  const server = new ApolloServer({
    schema: buildSubgraphSchema(parse(schema))
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  });

  await mongoose.connect('mongodb://localhost:27017/airwise').then(() => console.log('Mongoose connected successfully')).catch(err => console.log(err));
  console.log(`🚀 Server ready at ${url}`);
}
