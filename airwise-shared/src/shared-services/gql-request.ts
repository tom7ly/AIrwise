import { DocumentNode } from "graphql";
import request from "graphql-request";

export interface IGraphQLRequest {
    operationName?: string;
    operation: DocumentNode;
    variables: any;
}

class GraphQLOperation<T> {
    operationName: string;
    operation: DocumentNode;
    variables: any;

    constructor(operation: DocumentNode, variables: any = {}) {
        this.operation = operation;
        this.variables = variables;
        const operationDefinition: any = this.operation.definitions.find(def => def.kind === 'OperationDefinition');
        this.operationName = operationDefinition && operationDefinition.name ? operationDefinition.name.value : '';
    }
}

export const callGQLOP = async <T>(url: string, operation: IGraphQLRequest): Promise<T> => {
    try {
        const op = new GraphQLOperation<T>(operation.operation, operation.variables);
        const response: any = (await request(url, op.operation, op.variables));
        return response[op.operationName] as T
    } catch (error) {
        throw error;
    }
}