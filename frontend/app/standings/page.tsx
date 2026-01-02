"use client";
import type { teamStanding } from "../types";

import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const divisions = [
  "AL West",
  "AL Central",
  "AL East",
  "NL West",
  "NL Central",
  "NL East",
];

const leagues = ["American League", "National League"];

export default function page() {
  const [teamStandings, setTeamStandings] = useState<teamStanding[]>([]);
  const [year, setYear] = useState<number>(2025);

  const getData = async () => {
    const res = await fetch(`http://127.0.0.1:8000/all_standings_by_year/2025`);
    const data = await res.json();

    console.log(data);
    setTeamStandings(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex w-full">
      {/* <div className="w-fit">
        <Label htmlFor="year">Season</Label>
        <Input
          id="year"
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </div> */}
      <Tabs defaultValue="division" className="flex-1 p-2">
        <TabsList>
          <TabsTrigger value="division">Division</TabsTrigger>
          <TabsTrigger value="league">League</TabsTrigger>
          <TabsTrigger value="mlb">MLB</TabsTrigger>
        </TabsList>
        <TabsContent value="mlb" className="px-5">
          <div className="font-bold text-2xl">MLB</div>
          <DataTable
            columns={columns}
            data={teamStandings}
            initialSorting={[{ id: "W", desc: true }]}
          />
        </TabsContent>
        <TabsContent value="league" className="px-5">
          {leagues.map((league, i) => {
            const leagueStandings = teamStandings.filter(
              (team) => team.League == league
            );
            return (
              <div key={i} className="mb-4">
                <div className="font-bold text-2xl">{league}</div>
                <DataTable
                  columns={columns}
                  data={leagueStandings}
                  initialSorting={[{ id: "W", desc: true }]}
                />
              </div>
            );
          })}
        </TabsContent>
        <TabsContent value="division" className="px-5">
          {divisions.map((division, i) => {
            const divisionStandings = teamStandings.filter(
              (team) => team.Division == division
            );
            return (
              <div key={i} className="mb-4">
                <div className="font-bold text-2xl">{division}</div>
                <DataTable
                  columns={columns}
                  data={divisionStandings}
                  initialSorting={[{ id: "W", desc: true }]}
                />
              </div>
            );
          })}
        </TabsContent>
      </Tabs>
      <div>
        {/* {teamStandings.map((teamstanding: teamStanding, i: number) => {
          return (
            <div key={i} className={"flex justify-evenly"}>
              <div>{teamstanding.Name}</div>
              <div>W%: {teamstanding["W%"].toFixed(3)} </div>
              <div>xW%: {teamstanding["xW%"].toFixed(3)} </div>
              <div>
                Diff:{" "}
                {((teamstanding["W%"] - teamstanding["xW%"]) * 100).toFixed(3)}{" "}
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
}
