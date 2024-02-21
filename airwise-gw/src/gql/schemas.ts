
const users = {
    1: {
      id: '1',
      name: 'John',
      username: '@john'
    },
    2: {
      id: '2',
      name: 'Jane',
      username: '@jane'
    }
  }
  
  const schema = `
  type Query {
    airport(id: ID!): AirportData
  }

  type AirportData {
    id: ID!
    ident: String!
    type: String!
    name: String!
    latitude_deg: Float!
    longitude_deg: Float!
    elevation_ft: Int!
    continent: String!
    iso_country: String!
    iso_region: String!
    municipality: String!
    scheduled_service: String!
    gps_code: String!
    iata_code: String
    local_code: String!
    home_link: String
    wikipedia_link: String
    keywords: String
  }
`
  
  const resolvers = {
    Query: {
        airport: (_, { id }) => {
          // get airport by ID logic
        },
      },
    User: {
      __resolveReference: (source, args, context, info) => {
        return users[source.id]
      }
    }
  }