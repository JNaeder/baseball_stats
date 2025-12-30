"use client";

import type { playerStats } from "./types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Home() {
  const [year, setYear] = useState<number>(2025);
  const [playerData, setPlayerData] = useState<playerStats[]>([]);
  const getData = async () => {
    const res = await fetch(
      `http://127.0.0.1:8000/all_player_stats_by_year/${year}`
    );
    const data = await res.json();
    setPlayerData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col h-dvh">
      <div>John's Baseball Stuff</div>
      <div className="flex flex-col w-100">
        <Input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
        <Button onClick={() => getData()}>Refresh</Button>
      </div>
      <div className="px-10 pt-5 flex-1">
        <DataTable columns={columns} data={playerData} />
      </div>
    </div>
  );
}
