import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { Button } from "./button";
import { Wallet } from "lucide-react";

export function Account() {
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const formattedAddress = formatAddress(address);

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 shadow-sm gap-3">
      <div className="flex items-center gap-3">
        {ensAvatar ? (
          <img
            alt="ENS Avatar"
            className="w-10 h-10 rounded-full bg-gray-200"
            src={ensAvatar}
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200" />
        )}
        <div className="flex flex-col">
          {address && (
            <div className="text-sm font-medium text-gray-700">
              {ensName ? `${ensName} (${formattedAddress})` : formattedAddress}
            </div>
          )}
          <div className="text-xs text-gray-500">
            Connected to {connector?.name} Connector
          </div>
        </div>
      </div>
      <Button onClick={() => disconnect()}>
        <Wallet className="h-4 w-4 mr-2" />
        Disconnect
      </Button>
    </div>
  );
}

function formatAddress(address?: string) {
  if (!address) return null;
  return `${address.slice(0, 6)}…${address.slice(38, 42)}`;
}
