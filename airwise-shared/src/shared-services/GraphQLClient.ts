import { DocumentNode } from 'graphql';
import { Variables, GraphQLClient as gq } from 'graphql-request';

export class GraphQLClient extends gq {
    constructor(url: string = 'http://localhost:4000/graphql') {
        super(url);
    }
    async callQuery<T extends Variables>(query: DocumentNode, variables: T): Promise<any> {
        try {
            const data = await this.request<T>(query, variables);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}