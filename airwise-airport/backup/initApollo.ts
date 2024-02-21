import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import path from "path";
import { resolvers } from "../src/schemas/airport.schema.apollo";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { CGClient } from "../src/code-gen/cgclient/CGClient"
import { getAirportsByContinentQuery } from "./generated/queries/getAirportsByContinent";
import { AirportDataEnum } from "./generated/enums/AirportDataEnum";
import request from "graphql-request";
export const initApollo = async () => {
    const schemapath = path.join(process.cwd(), 'src/schemas/**/*.ts')
    const typesArray = loadFilesSync(schemapath);
    const typeDefs = mergeTypeDefs(typesArray);
    const server = new ApolloServer({

        schema: buildSubgraphSchema({ typeDefs, resolvers }),
    });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 3000 },

    });
    // const c = new CGClient()
    // c.getCodegen()
    const a = getAirportsByContinentQuery([AirportDataEnum.continent], "EU")
    console.log(a.operation)
    request("http://localhost:4000/graphql", a.operation, a.variables).then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log(err)
    })
}