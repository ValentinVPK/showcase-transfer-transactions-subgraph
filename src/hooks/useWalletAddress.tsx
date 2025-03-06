import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const useWalletAddress = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address);
    } else {
      setWalletAddress("");
    }
  }, [address, isConnected]);

  return { walletAddress, setWalletAddress };
};
