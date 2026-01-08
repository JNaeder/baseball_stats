import type { teamData } from "@/types/teamTypes";

export default async function page({
  params,
}: {
  params: Promise<{ teamId: number; year: number }>;
}) {
  const { teamId, year } = await params;

  const res = await fetch(
    `http://127.0.0.1:8000/get_team_stats/${teamId}/${year}`
  );

  const data = await res.json();
  const teamData: teamData = data["team_info"];
  const season = data["season"];
  const players = data["players"];
  console.log(data);
  return (
    <div>
      {season} {teamData.fullName}
      {players.map((player, i: number) => (
        <div key={i}>{player["name"]}</div>
      ))}
    </div>
  );
}
