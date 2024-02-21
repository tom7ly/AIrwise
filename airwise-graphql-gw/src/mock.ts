
import Fastify from 'fastify'
import mercuriusWithFederation from '@mercuriusjs/federation'
import { IService } from './service-manager'

export const initMock = async (): Promise<IService> => {
  const app = Fastify()
  const schema = `
  type User @key(fields: "id") {
    id: ID!
    name: String
  }

  type Post @key(fields: "id") {
    id: ID!
    title: String
    content: String
    author: User
  }
  
  type Mutation {
    createUser(name: String!): User
  }

  type Query {
    user(id: ID!): User
    post(id: ID!): Post
  }
  `;

  const resolvers = {
    Query: {
      user: async (_, { id }) => {
        return { id, name: "test" }
      },
    },
    User: {
      __resolveReference: (object) => {
        return { name: "test", id: "1" }
      },
    },
  };
  app.register(mercuriusWithFederation.mercuriusFederationPlugin, {
    schema, resolvers
  })

  app.get('/', async function (req, reply) {
    const query = '{ _service { sdl } }'
    return app.graphql(query)
  })
  app.ready(async err => {
    if (err) throw err
    await app.listen({ port: 4444 })
    console.log("App listening on port 4444")
  })
  return {
    name: 'mock',
    url: 'http://localhost:4444/graphql',
    urlBase: 'http://localhost:4444',
    mandatory: false
  }
}
