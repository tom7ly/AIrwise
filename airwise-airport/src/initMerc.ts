import mercuriusWithFederation, { buildFederationSchema } from '@mercuriusjs/federation';
import Fastify from 'fastify';
import mongoose, { get } from 'mongoose';
import { schema, resolvers } from './schemas/airport.schema';
import request, { gql } from 'graphql-request';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { buildSchema, print, printSchema } from 'graphql';
// import { getAirportsByContinentQuery } from './generated/queries/getAirportsByContinent';
// import { AirportDataEnum } from './generated/enums/AirportDataEnum';
import { importSchemasAndResolvers } from './getSchemas';
import { queryTest } from './tests';








export const initMerc = async () => {
    const app = Fastify()
    const imports = await importSchemasAndResolvers()
    await app.register(mercuriusWithFederation.mercuriusFederationPlugin, {
        ...imports
    })
    app.get('/', async function (req, reply) {
        const query = '{ _service { sdl } }'
        return app.graphql(query)
    })

    app.ready(err => {
        if (err) throw err
        app.listen({ port: 3000 })
        console.log("App listening on port 3000")
    })
    await mongoose.connect('mongodb://localhost:27017/airwise').then(() => console.log('Mongoose connected successfully')).catch(err => console.log(err));
    // await queryTest()
}