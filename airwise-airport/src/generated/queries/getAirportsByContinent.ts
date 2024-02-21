
import { AirportDataEnum } from 'src/generated/enums/AirportDataEnum';
import { gql } from 'graphql-tag';

export const getAirportsByContinentQuery = (fields: AirportDataEnum[], continent: string) => {
  const fieldsString = fields.join('\n\t\t\t\t\t');
  return {
      operation: gql`query ($continent: String!) {
        getAirportsByContinent ( continent: $continent) {
            ${fieldsString}
        }
    }`,
      variables: { continent }
  };
};
