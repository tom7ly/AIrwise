import { gql } from 'graphql-request';
export const GET_AIRPORTS_BY_CONTINENT = gql`
  query GetAirportsByContinent($continent: String!) {
    getAirportsByContinent(continent: $continent) {
      id
      name
      // ...other fields
    }
  }
`;

