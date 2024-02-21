import request from "graphql-request";
class GraphQLOperation {
    constructor(operation, variables = {}) {
        this.operation = operation;
        this.variables = variables;
        const operationDefinition = this.operation.definitions.find(def => def.kind === 'OperationDefinition');
        this.operationName = operationDefinition && operationDefinition.name ? operationDefinition.name.value : '';
    }
}
export const executeGraphQLOperation = async (url, operation) => {
    try {
        const op = new GraphQLOperation(operation.operation, operation.variables);
        const response = (await request(url, op.operation, op.variables));
        return response[op.operationName];
    }
    catch (error) {
        throw error;
    }
};
