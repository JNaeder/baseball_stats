"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { playerStats } from "../../types";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SortableHeader = ({ label, column }: { label: string; column: any }) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {label}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);

export const columns: ColumnDef<playerStats>[] = [
  {
    accessorKey: "Season",
    header: "Season",
  },
  {
    accessorKey: "Age",
    header: "Age",
  },
  {
    accessorKey: "Team",
    header: "Team",
  },
  {
    accessorKey: "G",
    header: "G",
    size: 10,
  },
  {
    accessorKey: "PA",
    header: "PA",
    size: 10,
  },
  {
    accessorKey: "AB",
    header: "AB",
    size: 10,
  },
  {
    accessorKey: "R",
    header: "R",
    size: 10,
  },
  {
    accessorKey: "H",
    header: "H",
    size: 10,
  },
  {
    accessorKey: "2B",
    header: "2B",
    size: 10,
  },
  {
    accessorKey: "3B",
    header: "3B",
    size: 10,
  },
  {
    accessorKey: "HR",
    header: "HR",
    size: 10,
  },
  {
    accessorKey: "RBI",
    header: "RBI",
    size: 10,
  },
  {
    accessorKey: "BB",
    header: "BB",
    size: 10,
  },
  {
    accessorKey: "BB%",
    header: "BB%",
    cell: ({ getValue }) => `${getValue<number>()} %`,
  },
  {
    accessorKey: "SO",
    header: "SO",
    size: 10,
  },
  {
    accessorKey: "SO%",
    header: "SO%",
    cell: ({ getValue }) => `${getValue<number>()} %`,
  },
  {
    accessorKey: "AVG",
    header: "AVG",
  },
  {
    accessorKey: "OBP",
    header: "OBP",
  },
  {
    accessorKey: "SLG",
    header: "SLG",
  },
  {
    accessorKey: "ISO",
    header: "ISO",
  },
  {
    accessorKey: "wOBA",
    header: "wOBA",
  },
];
