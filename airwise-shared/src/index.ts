

import { AirportData, Query } from './generated/graphql';
import { airportsByContinentQuery } from './helpers';
import { Resolvers } from './generated/graphql';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import { callGQLOP } from './shared-services/gql-request';
const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://your-graphql-endpoint.com', fetch: fetch }),
  cache: new InMemoryCache(),
});

const endpoint = 'http://localhost:4000/graphql'
callGQLOP<AirportData[]>(endpoint, airportsByContinentQuery).then((data) => {
  console.log(data[0].continent);
}).catch((error) => {
  console.error(error);
});