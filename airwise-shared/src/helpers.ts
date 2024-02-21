import gql from "graphql-tag";
import { IGraphQLRequest } from "./shared-services/gql-request";

export const graphqlQuery = gql`
{
  user(id: "3") {
    id
    name
  }
}
`;

export const airportsByContinentQuery: IGraphQLRequest = {
  operation: gql`
    query ($continent: String!) {
      getAirportsByContinent(continent: $continent) {
        id   
        ident
        type
        name
        latitude_deg
        longitude_deg
        elevation_ft
        continent
        iso_country
        municipality
        scheduled_service
        iata_code
        local_code
        home_link
        wikipedia_link
        keywords
      }
    }`,
  variables: {
    continent: 'EU'
  }
}