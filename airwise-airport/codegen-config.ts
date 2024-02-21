import {ICodegenConfig} from './code-gen/cgcore/shared-types'   


const codegenConfig: ICodegenConfig = {
    gatewayUrl: 'http://localhost:4000/graphql',
    schemaPaths:[
        '/src/schemas/airport.schema.ts',
    ],
    outputDir: '/src/generated',
}
export default codegenConfig;