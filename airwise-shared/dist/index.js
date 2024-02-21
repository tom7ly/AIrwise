import { airportsByContinentQuery } from './helpers';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import { executeGraphQLOperation } from './shared-services/gql-request';
const client = new ApolloClient({
    link: new HttpLink({ uri: 'https://your-graphql-endpoint.com', fetch: fetch }),
    cache: new InMemoryCache(),
});
const endpoint = 'http://localhost:4000/graphql';
executeGraphQLOperation(endpoint, airportsByContinentQuery).then((data) => {
    console.log(data[0].continent);
}).catch((error) => {
    console.error(error);
});
