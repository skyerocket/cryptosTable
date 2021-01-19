/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCrypto = /* GraphQL */ `
  query GetCrypto($id: ID!) {
    getCrypto(id: $id) {
      id
      currency
      date
      open
      high
      low
      close
      volume
      marketCap
    }
  }
`;
export const listCryptos = /* GraphQL */ `
  query ListCryptos(
    $filter: ModelCryptoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCryptos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        currency
        date
        open
        high
        low
        close
        volume
        marketCap
      }
      nextToken
    }
  }
`;
