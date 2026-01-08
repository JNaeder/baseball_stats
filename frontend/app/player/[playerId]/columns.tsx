"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { SinglePlayerStats } from "@/types/playerTypes";
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

export const columns: ColumnDef<SinglePlayerStats>[] = [
  {
    accessorKey: "season",
    header: "Season",
  },
  // {
  //   accessorKey: "",
  //   header: "Age",
  // },
  {
    accessorKey: "team.fullName",
    header: "Team",
  },
  {
    accessorKey: "stats.G",
    header: "G",
    size: 10,
  },
  {
    accessorKey: "stats.PA",
    header: "PA",
    size: 10,
  },
  {
    accessorKey: "stats.AB",
    header: "AB",
    size: 10,
  },
  {
    accessorKey: "stats.R",
    header: "R",
    size: 10,
  },
  {
    accessorKey: "stats.H",
    header: "H",
    size: 10,
  },
  {
    accessorKey: "stats.2B",
    header: "2B",
    size: 10,
  },
  {
    accessorKey: "stats.3B",
    header: "3B",
    size: 10,
  },
  {
    accessorKey: "stats.HR",
    header: "HR",
    size: 10,
  },
  {
    accessorKey: "stats.RBI",
    header: "RBI",
    size: 10,
  },
  {
    accessorKey: "stats.BB",
    header: "BB",
    size: 10,
  },
  {
    accessorKey: "stats.BB%",
    header: "BB%",
    cell: ({ getValue }) => `${getValue<number>()} %`,
  },
  {
    accessorKey: "stats.SO",
    header: "SO",
    size: 10,
  },
  {
    accessorKey: "stats.SO%",
    header: "SO%",
    cell: ({ getValue }) => `${getValue<number>()} %`,
  },
  {
    accessorKey: "stats.AVG",
    header: "AVG",
  },
  {
    accessorKey: "stats.OBP",
    header: "OBP",
  },
  {
    accessorKey: "stats.SLG",
    header: "SLG",
  },
  {
    accessorKey: "stats.ISO",
    header: "ISO",
  },
  {
    accessorKey: "stats.wOBA",
    header: "wOBA",
  },
  {
    accessorKey: "stats.wRAA",
    header: "wRAA",
  },
  {
    accessorKey: "stats.RC",
    header: "RC",
  },
];
