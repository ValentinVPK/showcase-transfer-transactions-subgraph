import { useAccount } from "wagmi";
import { Header } from "./components/layout/Header";
import TransactionsTable from "./components/layout/TransactionsTable";
import { formatAddress } from "./lib/utils";
// import { TESTING_WALLET_ADDRESS } from "./lib/constants";

function App() {
  const { address } = useAccount();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 ">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">
            USDT Transfer Tracker on Sepolia
          </h1>
          <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
            This app uses a subgraph on The Graph protocol to index ERC-20 USDT
            token transfers on the Sepolia testnet. The subgraph efficiently
            tracks all transfer events for the USDT contract{" "}
            <a
              href="https://sepolia.etherscan.io/address/0x93C5d30a7509E60871B77A3548a5BD913334cd35"
              className="text-indigo-600 hover:underline"
            >
              ({formatAddress("0x93C5d30a7509E60871B77A3548a5BD913334cd35")})
            </a>
          </p>
        </div>
        <TransactionsTable walletAddress={address} />
      </main>
    </div>
  );
}

export default App;
