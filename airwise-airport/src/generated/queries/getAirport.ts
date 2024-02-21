
import { AirportDataEnum } from 'src/generated/enums/AirportDataEnum';
import { gql } from 'graphql-tag';

export const getAirportQuery = (fields: AirportDataEnum[], id: string) => {
  const fieldsString = fields.join('\n\t\t\t\t\t');
  return {
      operation: gql`query ($id: ID!) {
        getAirport ( id: $id) {
            ${fieldsString}
        }
    }`,
      variables: { id }
  };
};
