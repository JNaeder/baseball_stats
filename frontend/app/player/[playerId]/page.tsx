import type { playerData } from "@/app/types";
import Image from "next/image";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import MyChart from "./chart";

export default async function page({
  params,
}: {
  params: Promise<{ playerId: number }>;
}) {
  const playerId = (await params).playerId;
  const res = await fetch(`http://127.0.0.1:8000/get_player_stats/${playerId}`);

  const playerData: playerData = await res.json();
  // console.log(playerData);

  return (
    <div>
      <div className="flex items-center p-4 border-b-2">
        <Image
          className="rounded-2xl border-2 border-black"
          src={playerData.photo_url}
          alt={`${playerData.name}'s Photo`}
          width={100}
          height={100}
        />
        <div className="ml-5">
          <div className="text-5xl">{playerData.name}</div>
          <div className=" bg-blue-400 rounded-2xl text-center font-bold border-black border-2 w-fit px-4">
            {playerData.position}
          </div>
          <div>
            <b>Place of Birth:</b> {playerData.birthCountry}
          </div>
          <div>
            <b>DOB:</b> {playerData.birthdate}
          </div>
          <div>
            <b>Age:</b> {playerData.currentAge}
          </div>
          <div>
            <b>Throws:</b> {playerData.throws}
          </div>
          <div>
            <b>Bats:</b> {playerData.bats}
          </div>
        </div>
        <MyChart playerStats={playerData.stats} />
      </div>
      <div className="px-10 pt-5 flex-1">
        <DataTable columns={columns} data={playerData.stats} />
      </div>
    </div>
  );
}
