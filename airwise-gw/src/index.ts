'use strict'

const Fastify = require('fastify')
const mercuriusWithFederation = require('@mercuriusjs/federation')
const app = Fastify()


app.register(mercuriusWithFederation, {
  schema,
  resolvers,
})

app.get('/', async function (req, reply) {
  const query = '{ _service { sdl } }'
  return app.graphql(query)
})

app.listen({ port: 3000 })
console.log("App listening on port 3000")