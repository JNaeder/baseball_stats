"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { teamStanding } from "@/app/types";
import { Button } from "@/components/ui/button";
import { CircleCheckBig } from "lucide-react";

const SortableHeader = ({ label, column }: { label: string; column: any }) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {label}
  </Button>
);

export const columns: ColumnDef<teamStanding>[] = [
  {
    accessorKey: "Name",
    header: "Team",
  },
  {
    accessorKey: "Clinched",
    header: ({ column }) => <SortableHeader label="PlayOffs" column={column} />,
    size: 10,
    cell: ({ getValue }) =>
      getValue() ? <CircleCheckBig className="text-green-500" /> : null,
  },
  {
    accessorKey: "Division",
    header: "Division",
  },
  {
    accessorKey: "W",
    header: ({ column }) => <SortableHeader label="W" column={column} />,
    size: 10,
  },
  {
    accessorKey: "L",
    header: ({ column }) => <SortableHeader label="L" column={column} />,
    size: 10,
  },
  {
    accessorKey: "RS",
    header: ({ column }) => <SortableHeader label="RS" column={column} />,
    size: 10,
  },
  {
    accessorKey: "RA",
    header: ({ column }) => <SortableHeader label="RA" column={column} />,
    size: 10,
  },
  {
    accessorKey: "RunDiff",
    header: ({ column }) => <SortableHeader label="RunDiff" column={column} />,
    size: 10,
  },
  {
    accessorKey: "W%",
    header: ({ column }) => <SortableHeader label="W%" column={column} />,
    size: 10,
  },
  {
    accessorKey: "xW%",
    header: ({ column }) => <SortableHeader label="xW%" column={column} />,
    size: 10,
  },
  {
    accessorKey: "W%Diff",
    header: ({ column }) => <SortableHeader label="W%Diff" column={column} />,
    size: 10,
  },
];
