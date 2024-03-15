'use strict'

import Fastify from 'fastify'
import mercuriusWithFederation from '@mercuriusjs/federation'
import { resolvers, schema } from './schemas/airport.schema'
import { gql } from 'graphql-tag'
import request, { GraphQLClient } from 'graphql-request'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge';
import path from 'path'
import { initMerc } from './initMerc'
import { initApollo } from './initApollo'

// import { createAirportMutation } from './generated/mutations/createAirport'
// import { AirportDataEnum } from './generated/enums/AirportDataEnum'
// import { IAirportInput } from './generated/interfaces/AirportInput'
// import { getAirportQuery } from './generated/queries/getAirport'


// const airport: IAirportInput = {
//     ident: "test",
//     type: "test",
//     name: "test",
//     latitude_deg: 0,
//     longitude_deg: 0,
//     elevation_ft: 0,
//     continent: "test",
//     iso_country: "test",
//     iso_region: "test",
//     municipality: "test",
//     scheduled_service: "test",
//     iata_code: "test",
//     local_code: "test",
//     home_link: "test",
//     wikipedia_link: "test",
//     keywords: "test"

// }
// const a = createAirportMutation([AirportDataEnum.continent], airport)
// const b = getAirportQuery([AirportDataEnum.continent], "5f9f1b9b9c9b3b1e3c9e9b1e")


// initApollo()
initMerc()


