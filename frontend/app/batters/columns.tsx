"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { playerStats } from "@/app/types";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SortableHeader = ({ label, column }: { label: string; column: any }) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {label}
  </Button>
);

export const columns: ColumnDef<playerStats>[] = [
  {
    accessorKey: "Name",
    header: "Name",
    size: 10,
    cell: ({ row }) => (
      <Link
        href={`/player/${row.original.PlayerId}`}
        className="text-blue-500 hover:underline"
      >
        {row.original.Name}
      </Link>
    ),
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
    accessorKey: "Pos",
    header: "Pos",
  },
  {
    accessorKey: "G",
    header: ({ column }) => <SortableHeader label="G" column={column} />,
    size: 10,
  },
  {
    accessorKey: "PA",
    header: ({ column }) => <SortableHeader label="PA" column={column} />,
    size: 10,
  },
  {
    accessorKey: "AB",
    header: ({ column }) => <SortableHeader label="AB" column={column} />,
    size: 10,
  },
  {
    accessorKey: "R",
    header: ({ column }) => <SortableHeader label="R" column={column} />,
    size: 10,
  },
  {
    accessorKey: "H",
    header: ({ column }) => <SortableHeader label="H" column={column} />,
    size: 10,
  },
  {
    accessorKey: "2B",
    header: ({ column }) => <SortableHeader label="2B" column={column} />,
    size: 10,
  },
  {
    accessorKey: "3B",
    header: ({ column }) => <SortableHeader label="3B" column={column} />,
    size: 10,
  },
  {
    accessorKey: "HR",
    header: ({ column }) => <SortableHeader label="HR" column={column} />,
    size: 10,
  },
  {
    accessorKey: "BB",
    header: ({ column }) => <SortableHeader label="BB" column={column} />,
    size: 10,
  },
  {
    accessorKey: "SO",
    header: ({ column }) => <SortableHeader label="SO" column={column} />,
    size: 10,
  },
  {
    accessorKey: "RBI",
    header: ({ column }) => <SortableHeader label="RBI" column={column} />,
    size: 10,
  },
  {
    accessorKey: "AVG",
    header: ({ column }) => <SortableHeader label="AVG" column={column} />,
  },
  {
    accessorKey: "OBP",
    header: ({ column }) => <SortableHeader label="OBP" column={column} />,
  },
  {
    accessorKey: "SLG",
    header: ({ column }) => <SortableHeader label="SLG" column={column} />,
  },
  {
    accessorKey: "OPS",
    header: ({ column }) => <SortableHeader label="OPS" column={column} />,
  },
  {
    accessorKey: "ISO",
    header: ({ column }) => <SortableHeader label="ISO" column={column} />,
  },
  {
    accessorKey: "wOBA",
    header: ({ column }) => <SortableHeader label="wOBA" column={column} />,
  },
];
