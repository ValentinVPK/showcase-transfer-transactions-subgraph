import { useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface AddressInputProps {
  onAddressSubmit: (address: string) => void;
  className?: string;
}

export default function AddressInput({
  onAddressSubmit,
  className,
}: AddressInputProps) {
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);

    if (error) setError(null);
  };

  const handleSubmit = () => {
    if (!address) {
      setError("Please enter an address");
      return;
    }

    const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!ethereumAddressRegex.test(address)) {
      setError("Please enter a valid Ethereum address");
      return;
    }

    onAddressSubmit(address);
    setError(null);
  };

  return (
    <div className={cn("w-full relative", className)}>
      <div
        className={cn(
          "flex items-center w-full rounded-md border border-input bg-background h-9 text-sm transition-colors overflow-hidden",
          isFocused && "ring-2 ring-ring/20",
          error && "border-destructive ring-destructive/20"
        )}
      >
        <input
          type="text"
          value={address}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter Wallet address (0x...)"
          className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground h-full px-3"
        />
        <Button
          type="button"
          size="sm"
          onClick={handleSubmit}
          variant="secondary"
          className="h-full rounded-l-none px-3"
        >
          Search
        </Button>
      </div>
      {error && (
        <div className="absolute -bottom-6 left-0 text-sm text-destructive">
          {error}
        </div>
      )}
    </div>
  );
}
