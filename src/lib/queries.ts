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
