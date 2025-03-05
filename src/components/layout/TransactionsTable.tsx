import { useQuery } from "@apollo/client";
import { GET_TRANSFERS, GET_TRANSFERS_BY_ADDRESS } from "../../lib/queries";
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
import { ExternalLink, FileX } from "lucide-react";
import { ETHERSCAN_BASE_URL } from "@/lib/constants";
import { formatAddress, formatValue } from "@/lib/utils";

type TransactionsTableProps = {
  walletAddress?: string;
};

export default function TransactionsTable({
  walletAddress,
}: TransactionsTableProps) {
  const { data, loading, error, refetch } = useQuery(
    walletAddress ? GET_TRANSFERS_BY_ADDRESS : GET_TRANSFERS,
    {
      variables: walletAddress ? { address: walletAddress } : undefined,
      pollInterval: 60000,
      notifyOnNetworkStatusChange: true,
    }
  );

  const noTransfers = !data?.transfers || data.transfers.length === 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">
          {walletAddress ? "Your Transactions" : "Recent Transfers"}
        </h2>
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

      {!loading && !error && (
        <div className="rounded-md border">
          <Table>
            <TableCaption>
              {walletAddress
                ? `Showing transfers for address: ${formatAddress(
                    walletAddress
                  )}`
                : "Showing recent transfers on the network"}
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
              {noTransfers ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <FileX className="h-10 w-10 mb-2" />
                      <p className="text-lg font-medium">No transfers found</p>
                      <p className="text-sm">
                        {walletAddress
                          ? "This address hasn't made any transactions yet"
                          : "There are no recent transactions to display"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data.transfers.map((transfer: Transfer) => (
                  <TableRow key={transfer.id}>
                    <TableCell
                      className={`font-mono ${
                        walletAddress &&
                        transfer.from.toLowerCase() ===
                          walletAddress.toLowerCase()
                          ? "bg-primary/10"
                          : ""
                      }`}
                    >
                      <a
                        href={`${ETHERSCAN_BASE_URL}/address/${transfer.from}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-primary"
                      >
                        {formatAddress(transfer.from)}
                      </a>
                    </TableCell>
                    <TableCell
                      className={`font-mono ${
                        walletAddress &&
                        transfer.to.toLowerCase() ===
                          walletAddress.toLowerCase()
                          ? "bg-primary/10"
                          : ""
                      }`}
                    >
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
