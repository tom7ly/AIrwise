import gql from "graphql-tag";
export const graphqlQuery = gql `
{
  user(id: "3") {
    id
    name
  }
}
`;
export const airportsByContinentQuery = {
    operation: gql `
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
        iso_region
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
};
