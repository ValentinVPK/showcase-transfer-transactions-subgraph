import { useQuery } from "@apollo/client";
import { Header } from "./components/layout/Header";
import { GET_TRANSFERS } from "./lib/queries";

interface Transfer {
  id: string;
  from: string;
  to: string;
  value: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}

function App() {
  const { data, loading, error } = useQuery(GET_TRANSFERS);

  console.log("data", data);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 ">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <div>
            <h2 className="text-xl font-bold mb-4">Transfers</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">From</th>
                    <th className="px-4 py-2 border">To</th>
                    <th className="px-4 py-2 border">Value</th>
                    <th className="px-4 py-2 border">Block</th>
                    <th className="px-4 py-2 border">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {data.transfers.map((transfer: Transfer) => (
                    <tr key={transfer.id}>
                      <td className="px-4 py-2 border">{transfer.from}</td>
                      <td className="px-4 py-2 border">{transfer.to}</td>
                      <td className="px-4 py-2 border">{transfer.value}</td>
                      <td className="px-4 py-2 border">
                        {transfer.blockNumber}
                      </td>
                      <td className="px-4 py-2 border">
                        {new Date(
                          parseInt(transfer.blockTimestamp) * 1000
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
