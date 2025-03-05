import { useAccount } from "wagmi";
import { Header } from "./components/layout/Header";
import TransactionsTable from "./components/layout/TransactionsTable";
// import { TESTING_WALLET_ADDRESS } from "./lib/constants";

function App() {
  const { address } = useAccount();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 ">
        <TransactionsTable walletAddress={address} />
      </main>
    </div>
  );
}

export default App;
