import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};

export const formatValue = (value: string) => {
  const ethValue = parseFloat(value) / 10 ** 9;
  return `${ethValue.toFixed(3)} USDT`;
};
