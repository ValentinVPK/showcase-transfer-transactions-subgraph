import { Wallet } from "lucide-react";
import { Button } from "../ui/button";
import { useAccount, useChainId, useConnect } from "wagmi";
import { Account } from "../ui/WalletAccount";

export function Header() {
  const chainId = useChainId();
  const { connectors, connect } = useConnect();
  const { isConnected } = useAccount();

  console.log("isConnected", isConnected);

  const metaMaskConnector = connectors.find(
    (connector) => connector.id === "metaMaskSDK"
  );

  if (!metaMaskConnector) {
    return (
      <Button disabled>
        <Wallet className="h-4 w-4 mr-2" />
        Connect Metamask Wallet
      </Button>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b shadow-sm flex justify-between items-center px-6 py-4 h-28">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-slate-800">
          Showcase Transfer Transactions
        </h1>
      </div>

      {isConnected ? (
        <div className="flex items-center gap-4">
          <Account />
        </div>
      ) : (
        <Button
          onClick={() => connect({ connector: metaMaskConnector, chainId })}
          className="cursor-pointer"
        >
          <Wallet className="h-4 w-4 mr-2" />
          Connect Metamask Wallet
        </Button>
      )}
    </header>
  );
}
