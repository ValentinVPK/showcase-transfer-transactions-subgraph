import { useQuery } from "@apollo/client";
import { GET_TRANSFERS } from "../../lib/queries";
import { Transfer } from "../../lib/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import { ETHERSCAN_BASE_URL } from "@/lib/constants";
import { formatAddress, formatValue } from "@/lib/utils";

export default function TransactionsTable() {
  const { data, loading, error, refetch } = useQuery(GET_TRANSFERS, {
    pollInterval: 60000,
    notifyOnNetworkStatusChange: true,
  });

  console.log("data.transfers", data?.transfers);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Recent Transfers</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              refetch();
            }}
            className="px-2 py-1 cursor-pointer text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center p-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}

      {error && (
        <div className="bg-destructive/15 p-4 rounded-md text-destructive">
          <p>Error: {error.message}</p>
        </div>
      )}

      {data && data.transfers && (
        <div className="rounded-md border">
          <Table>
            <TableCaption>
              A list of recent token transfers on the network.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Block</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Transaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.transfers.map((transfer: Transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell className="font-mono">
                    <a
                      href={`${ETHERSCAN_BASE_URL}/address/${transfer.from}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-primary"
                    >
                      {formatAddress(transfer.from)}
                    </a>
                  </TableCell>
                  <TableCell className="font-mono">
                    <a
                      href={`${ETHERSCAN_BASE_URL}/address/${transfer.to}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-primary"
                    >
                      {formatAddress(transfer.to)}
                    </a>
                  </TableCell>
                  <TableCell>{formatValue(transfer.value)}</TableCell>
                  <TableCell>
                    <a
                      href={`${ETHERSCAN_BASE_URL}/block/${transfer.blockNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-primary"
                    >
                      {transfer.blockNumber}
                    </a>
                  </TableCell>
                  <TableCell>
                    {format(
                      new Date(parseInt(transfer.blockTimestamp) * 1000),
                      "MMM d, yyyy HH:mm:ss"
                    )}
                  </TableCell>
                  <TableCell>
                    <a
                      href={`${ETHERSCAN_BASE_URL}/tx/${transfer.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      {formatAddress(transfer.transactionHash)}
                      <ExternalLink size={14} />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
