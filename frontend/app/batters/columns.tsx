"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { playerData } from "@/types/playerTypes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SortableHeader = ({ label, column }: { label: string; column: any }) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    className="p-0"
  >
    {label}
  </Button>
);

export const columns: ColumnDef<playerData>[] = [
  {
    accessorKey: "player.fullName",
    header: "Name",
    cell: ({ row }) => (
      <Link
        href={`/player/${row.original.player.id}`}
        className="text-blue-500 hover:underline"
      >
        {row.original.player.fullName}
      </Link>
    ),
  },
  {
    accessorKey: "player.currentAge",
    header: "Age",
  },
  // {
  //   accessorKey: "Team",
  //   header: "Team",
  // },
  {
    accessorKey: "position.abbreviation",
    header: "Pos",
  },
  {
    accessorKey: "stats.G",
    header: ({ column }) => <SortableHeader label="G" column={column} />,
    size: 10,
  },
  {
    accessorKey: "stats.PA",
    header: ({ column }) => <SortableHeader label="PA" column={column} />,
    size: 10,
  },
  {
    accessorKey: "stats.AB",
    header: ({ column }) => <SortableHeader label="AB" column={column} />,
    size: 10,
  },
  {
    accessorKey: "stats.R",
    header: ({ column }) => <SortableHeader label="R" column={column} />,
    size: 10,
  },
  {
    accessorKey: "stats.H",
    header: ({ column }) => <SortableHeader label="H" column={column} />,
    size: 10,
  },
  {
    accessorKey: "stats.2B",
    header: ({ column }) => <SortableHeader label="2B" column={column} />,
    size: 10,
  },
  {
    accessorKey: "stats.3B",
    header: ({ column }) => <SortableHeader label="3B" column={column} />,
    size: 10,
  },
  {
    accessorKey: "stats.HR",
    header: ({ column }) => <SortableHeader label="HR" column={column} />,
    size: 10,
  },
  {
    accessorKey: "stats.BB",
    header: ({ column }) => <SortableHeader label="BB" column={column} />,
    size: 10,
  },
  {
    accessorKey: "stats.SO",
    header: ({ column }) => <SortableHeader label="SO" column={column} />,
    size: 10,
  },
  {
    accessorKey: "stats.RBI",
    header: ({ column }) => <SortableHeader label="RBI" column={column} />,
    size: 10,
  },
  {
    accessorKey: "stats.AVG",
    header: ({ column }) => <SortableHeader label="AVG" column={column} />,
  },
  {
    accessorKey: "stats.OBP",
    header: ({ column }) => <SortableHeader label="OBP" column={column} />,
  },
  {
    accessorKey: "stats.SLG",
    header: ({ column }) => <SortableHeader label="SLG" column={column} />,
  },
  {
    accessorKey: "stats.OPS",
    header: ({ column }) => <SortableHeader label="OPS" column={column} />,
  },
  {
    accessorKey: "stats.ISO",
    header: ({ column }) => <SortableHeader label="ISO" column={column} />,
  },
  {
    accessorKey: "stats.wOBA",
    header: ({ column }) => <SortableHeader label="wOBA" column={column} />,
  },
  {
    accessorKey: "stats.wRAA",
    header: ({ column }) => <SortableHeader label="wRAA" column={column} />,
  },
  {
    accessorKey: "stats.RC",
    header: ({ column }) => <SortableHeader label="RC" column={column} />,
  },
];
