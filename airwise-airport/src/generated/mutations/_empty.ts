
import { null } from 'src/generated/enums/null';
import { gql } from 'graphql-tag';

export const _emptyMutation = (fields: null[], ) => {
  const fieldsString = fields.join('\n\t\t\t\t\t');
  return {
      operation: gql`mutation () {
        _empty ( ) {
            ${fieldsString}
        }
    }`,
      variables: {  }
  };
};
