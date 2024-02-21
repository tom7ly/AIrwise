
import { _ServiceEnum } from 'src/generated/enums/_ServiceEnum';
import { gql } from 'graphql-tag';

export const _serviceQuery = (fields: _ServiceEnum[], ) => {
  const fieldsString = fields.join('\n\t\t\t\t\t');
  return {
      operation: gql`query () {
        _service ( ) {
            ${fieldsString}
        }
    }`,
      variables: {  }
  };
};
