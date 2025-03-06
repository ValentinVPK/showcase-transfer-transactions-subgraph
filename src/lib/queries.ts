import { gql } from "@apollo/client";

export const GET_TRANSFERS = gql`
  query GetTransfers($first: Int, $skip: Int) {
    transfers(
      orderDirection: desc
      orderBy: blockTimestamp
      first: $first
      skip: $skip
    ) {
      blockNumber
      blockTimestamp
      from
      id
      to
      transactionHash
      value
    }
  }
`;

export const GET_TRANSFERS_BY_ADDRESS = gql`
  query GetTransactionsByAddress($address: String!, $first: Int, $skip: Int) {
    transfers(
      orderDirection: desc
      orderBy: blockTimestamp
      where: { or: [{ from: $address }, { to: $address }] }
      first: $first
      skip: $skip
    ) {
      blockNumber
      blockTimestamp
      from
      id
      to
      transactionHash
      value
    }
  }
`;
