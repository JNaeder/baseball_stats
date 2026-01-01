"use client";
import type { teamStanding } from "../types";

import { useState, useEffect } from "react";

export default function page() {
  const [teamStandings, setTeamStandings] = useState<teamStanding[]>([]);

  const getData = async () => {
    const res = await fetch(`http://127.0.0.1:8000/all_standings_by_year/2025`);
    const data = await res.json();
    setTeamStandings(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>Standings</div>
      <div>
        {teamStandings.map((teamstanding: teamStanding, i: number) => {
          return (
            <div
              key={i}
              className={`flex justify-evenly ${
                teamstanding.Clinched ? "bg-blue-300" : "bg-red-400"
              }`}
            >
              <div>{teamstanding.Name}</div>
              <div>W%: {teamstanding["W%"].toFixed(3)} </div>
              <div>xW%: {teamstanding["xW%"].toFixed(3)} </div>
              <div>
                Diff:{" "}
                {((teamstanding["W%"] - teamstanding["xW%"]) * 100).toFixed(3)}{" "}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
