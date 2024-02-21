import path from 'path';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { DocumentNode, print } from 'graphql';
import { IResolvers } from 'mercurius';
import { glob } from 'glob';

export interface SchemaAndResolvers {
    schema: DocumentNode | string;
    resolvers: IResolvers;
}

export async function importSchemasAndResolvers(): Promise<SchemaAndResolvers> {
    const schemaFiles = glob.sync(path.join(process.cwd(), './src/schemas/*.schema.ts'));

    const schemasAndResolvers = await Promise.all(schemaFiles.map(async (file) => {
        const { schema, resolvers } = await import(file);
        return { schema, resolvers };
    }));

    const mergedSchema = mergeTypeDefs(schemasAndResolvers.map(sr => sr.schema));
    const mergedResolvers = mergeResolvers(schemasAndResolvers.map(sr => sr.resolvers));

    return { schema: print(mergedSchema), resolvers: mergedResolvers as IResolvers };
}