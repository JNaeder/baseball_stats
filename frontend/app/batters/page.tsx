"use client";

import type { playerStats } from "@/app/types";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Filter from "./filters";
import Summary from "./summary";
import type { playerListResponse, playerListSummary } from "@/app/types";

export default function Home() {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [year, setYear] = useState<number>(2025);
  const [minPA, setMinPA] = useState<number>(300);
  const [teamId, setTeamId] = useState<number | null>(null);
  const [playerData, setPlayerData] = useState<playerStats[]>([]);
  const [summary, setSummary] = useState<playerListSummary>();

  const getData = async () => {
    setHasLoaded(false);
    const res = await fetch(
      `http://127.0.0.1:8000/all_player_stats_by_year/${year}?min_pa=${minPA}${
        teamId ? `&team_id=${teamId}` : ""
      }`
    );
    const data: playerListResponse = await res.json();
    setSummary(data.summary);
    setPlayerData(data.player_data);
    setHasLoaded(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col h-dvh w-dvw">
      <div className="flex items-center justify-center">
        <Filter
          year={year}
          setYear={setYear}
          minPA={minPA}
          setMinPA={setMinPA}
          setTeamId={setTeamId}
          getData={getData}
        />
        {/* <Summary summary={summary} /> */}
      </div>
      {hasLoaded ? (
        <div className="px-10 pt-5 flex-1">
          <DataTable columns={columns} data={playerData} />
        </div>
      ) : (
        <div className="w-full flex-1">
          <Spinner className="size-20 mx-auto mt-20 text-blue-500" />
        </div>
      )}
    </div>
  );
}
