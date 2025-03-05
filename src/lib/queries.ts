import { gql } from "@apollo/client";

export const GET_TRANSFERS = gql`
  query {
    transfers(orderDirection: desc, orderBy: blockTimestamp) {
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
  query GetTransactionsByAddress($address: String!) {
    transfers(
      orderDirection: desc
      orderBy: blockTimestamp
      where: { _or: [{ from: { _eq: $address } }, { to: { _eq: $address } }] }
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
