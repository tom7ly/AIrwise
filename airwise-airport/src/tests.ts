import request, { gql } from "graphql-request"
import { AirportDataEnum } from "./generated/enums/AirportDataEnum"
import { getAirportsByContinentQuery } from "./generated/queries/getAirportsByContinent"

export const queryTest = async () => {
    const query = getAirportsByContinentQuery([AirportDataEnum.continent], "EU")

    await request("http://localhost:4000/graphql", query.operation, query.variables)
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err)
        })
}

export const queryTestUser = async () => {
    const query = gql`
    query {
  user(id: "1") {
    id
  }
}`
    request("http://localhost:4000/graphql", query).then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log(err)
    })
}