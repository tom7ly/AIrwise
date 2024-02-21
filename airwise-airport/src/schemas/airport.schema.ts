import { gql } from "graphql-request";
import { AirportModel, IAirport } from "src/models/airport";

export const GET_USER_QUERY = gql`
  query GetUser {
    user {
      id
      name
    }
  }
`;


export const schema = gql`
  extend type Query  {
    getAirport(id: ID!): AirportData
    getAirportsByContinent(continent: String!): [AirportData]
}
  extend type Mutation {
    createAirport(airport: AirportInput!): AirportData
  }
  input AirportInput {
    ident: String
    airportType: AirportType
    name: String
    latitude_deg: Float
    longitude_deg: Float
    elevation_ft: Int
    continent: String
    iso_country: String
    iso_region: String
    municipality: String
    scheduled_service: String
    iata_code: String
    local_code: String
    home_link: String
    wikipedia_link: String
    keywords: String
  }
  enum AirportType {
    HELIPORT
    }
  type AirportData {
    id: ID!
    ident: String
    airportType: AirportType
    name: String
    latitude_deg: Float
    longitude_deg: Float
    elevation_ft: Int
    continent: String
    iso_country: String
    iso_region: String
    municipality: String
    scheduled_service: String
    iata_code: String
    local_code: String
    home_link: String
    wikipedia_link: String
    keywords: String
  }
`

export const resolvers = {
  Query: {
    getAirport: async (_, { id }) => {
      const airport = await AirportModel.findById(id);
      if (airport) {
        const airportObject = airport.toObject();
        return { ...airportObject, id: airportObject._id.toString() };
      }
      return null;
    },
    getAirportsByContinent: async (_, { continent }) => {
      const airports = await AirportModel.find({ continent });
      return airports.map(airport => {
        const airportObject = airport.toObject();
        return { ...airportObject, id: airportObject._id.toString() };
      });
    },
  },
  AirportData: {
    __resolveReference: async (object) => {
      const airport = await AirportModel.findById(object.id);
      if (airport) {
        const airportObject = airport.toObject();
        return { ...airportObject, id: airportObject._id.toString() };
      }
      return null;
    }
  },
  Mutation: {
    createAirport: async (_, { airport }: { airport: IAirport }) => {
      const airportObject = await AirportModel.create(airport);
      return { ...airportObject.toObject(), id: airportObject._id.toString() };
    }
  }
}
