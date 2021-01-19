/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCrypto = /* GraphQL */ `
  mutation CreateCrypto(
    $input: CreateCryptoInput!
    $condition: ModelCryptoConditionInput
  ) {
    createCrypto(input: $input, condition: $condition) {
      id
      currency
      date
      open
      high
      low
      close
      volume
      marketCap
      createdAt
      updatedAt
    }
  }
`;
export const updateCrypto = /* GraphQL */ `
  mutation UpdateCrypto(
    $input: UpdateCryptoInput!
    $condition: ModelCryptoConditionInput
  ) {
    updateCrypto(input: $input, condition: $condition) {
      id
      currency
      date
      open
      high
      low
      close
      volume
      marketCap
      createdAt
      updatedAt
    }
  }
`;
export const deleteCrypto = /* GraphQL */ `
  mutation DeleteCrypto(
    $input: DeleteCryptoInput!
    $condition: ModelCryptoConditionInput
  ) {
    deleteCrypto(input: $input, condition: $condition) {
      id
      currency
      date
      open
      high
      low
      close
      volume
      marketCap
      createdAt
      updatedAt
    }
  }
`;
