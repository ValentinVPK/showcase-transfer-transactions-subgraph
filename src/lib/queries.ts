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
      where: { or: [{ from: $address }, { to: $address }] }
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
