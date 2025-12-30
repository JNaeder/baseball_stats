"use client";

import type { player } from "./types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Home() {
  const [year, setYear] = useState<number>(2025);
  const [playerData, setPlayerData] = useState<player[]>([]);
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
    <div>
      <div>John's Baseball Stuff</div>
      <div className="flex flex-col w-100">
        <Input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
        <Button onClick={() => getData()}>Refresh</Button>
      </div>
      {playerData.map((player: player, i: number) => {
        return (
          <div key={i}>
            {player.Name} - {player.HR} ({player.Team}) ({player.Age})
          </div>
        );
      })}
    </div>
  );
}
