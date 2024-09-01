"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { PiArrowsDownUpLight } from "react-icons/pi";
import { FinancialRecord } from "../../types";

// export type RecordProps = {
//   _id?: string;
//   description: string;
//   amount: number;
//   category: string;
//   paymentMethod: string;
//   date: string;
// };

export const columns: ColumnDef<FinancialRecord>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <PiArrowsDownUpLight className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      const amountColor = amount < 0 ? "text-red-600" : "text-green-600";

      return <div className={`font-medium ${amountColor}`}>{formatted}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "paymentMethod",
    header: "Method",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <PiArrowsDownUpLight className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      const formattedTime = date.toLocaleTimeString("th-TH", {
        hour: "numeric",
        minute: "numeric",
      });

      return <div>{formattedDate} {formattedTime}</div>;
    },
  },
];
