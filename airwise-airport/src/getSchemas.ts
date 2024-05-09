import path from 'path';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { DocumentNode, print } from 'graphql';
import { glob } from 'glob';

export interface SchemaAndResolvers {
    schema: string;
    resolvers: any;
}

export async function importSchemasAndResolvers(paths: string[] = ["./src/schemas/*.schema.ts"]): Promise<SchemaAndResolvers> {
    const schemaFiles = paths.map(p => glob.sync(path.join(process.cwd(), p))).flat();
    const schemasAndResolvers = await Promise.all(schemaFiles.map(async (file) => {
        const { schema, resolvers } = await import(file);
        return { schema, resolvers };
    }));

    const mergedSchema = mergeTypeDefs(schemasAndResolvers.map(sr => sr.schema));
    const mergedResolvers = mergeResolvers(schemasAndResolvers.map(sr => sr.resolvers));

    return { schema: print(mergedSchema), resolvers: mergedResolvers };
}