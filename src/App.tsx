import { Header } from "./components/layout/Header";
import TransactionsTable from "./components/layout/TransactionsTable";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 ">
        <TransactionsTable />
      </main>
    </div>
  );
}

export default App;
