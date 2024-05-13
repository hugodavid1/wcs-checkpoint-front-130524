import { gql } from "@apollo/client";

export const queryCountriesCard = gql`
  query ExampleQuery {
    countries {
      emoji
      id
      name
      code
    }
  }
`;

export const queryCountry = gql`
  query Query($code: String!) {
    country(code: $code) {
      name
      id
      emoji
      code
      continent {
        name
      }
    }
  }
`;

export const mutationAddCountry = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      id
      name
      emoji
      code
    }
  }
`;

export const queryContinents = gql`
  query Continents {
    continents {
      name
      id
    }
  }
`;
