"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DonationButton from "@/components/donation/DonationButton";
import { DonationStatus } from "@prisma/client";

export type Donations = {
  id: string;
  charityId: string;
  donorName: string;
  itemType: string;
  size: string;
  status: string;
  date: string;
};

export const columns: ColumnDef<Donations>[] = [
  {
    accessorKey: "donorName",
    header: "Donor Name",
  },
  {
    accessorKey: "itemType",
    header: "Item Type",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const donation = row.original;

      return (
        <DropdownMenu modal={false} z-index={100}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-[162px] rounded-5 border-3 border-[#83B47D] bg-[#CEE9CA]"
            >
              <span>Take action</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(donation.id)}
            >
              Copy donation ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {donation.status === "SENT" && <DropdownMenuItem asChild>
              <DonationButton donationId={donation.id} status={donation.status as DonationStatus} />
            </DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
