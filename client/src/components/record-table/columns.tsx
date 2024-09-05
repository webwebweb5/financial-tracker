"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { PiArrowsDownUpLight } from "react-icons/pi";
import { FinancialRecord } from "../../types";

export const columns: ColumnDef<FinancialRecord>[] = [
  {
    id: "description",
    accessorKey: "description",
    header: "Description",
    size: 120,
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
      const formatted = new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(amount);

      const amountColor = amount < 0 ? "text-red-600" : "text-green-600 pl-3.5";

      return <div className={`font-medium pl-3 ${amountColor}`}>{formatted}</div>;
    },
    size: 120,
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 100,
  },
  {
    accessorKey: "paymentMethod",
    header: "Method",
    size: 120,
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

      return <div>{formattedDate} <br /> {formattedTime} น.</div>;
    },
    size: 120,
  },
];
