import { IAirportInput } from 'src/generated/interfaces/AirportInput';
import { AirportDataEnum } from 'src/generated/enums/AirportDataEnum';
import { gql } from 'graphql-tag';

export const createAirportMutation = (fields: AirportDataEnum[], airport: IAirportInput) => {
  const fieldsString = fields.join('\n\t\t\t\t\t');
  return {
      operation: gql`mutation ($airport: AirportInput!) {
        createAirport ( airport: $airport) {
            ${fieldsString}
        }
    }`,
      variables: { airport }
  };
};
