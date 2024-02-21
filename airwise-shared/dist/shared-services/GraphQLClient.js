import { GraphQLClient as gq } from 'graphql-request';
export class GraphQLClient extends gq {
    constructor(url = 'http://localhost:4000/graphql') {
        super(url);
    }
    async callQuery(query, variables) {
        try {
            const data = await this.request(query, variables);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}
