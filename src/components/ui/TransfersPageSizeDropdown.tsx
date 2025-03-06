"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const pageSizes: string[] = ["5", "10", "50", "100"];

type TransfersPageSizeDropdownProps = {
  pageSize: number;
  setPageSize: (pageSize: number) => void;
};

export default function TransfersPageSizeDropdown({
  pageSize,
  setPageSize,
}: TransfersPageSizeDropdownProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] justify-between"
        >
          {`Transfers per page: ${pageSize}`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {pageSizes.map((size) => (
                <CommandItem
                  key={size}
                  value={size}
                  onSelect={(currentValue) => {
                    setPageSize(parseInt(currentValue));
                    setOpen(false);
                  }}
                >
                  {size}
                  <Check
                    className={cn(
                      "ml-auto",
                      parseInt(size) === pageSize ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
