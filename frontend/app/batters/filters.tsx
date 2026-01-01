import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allTeamData } from "../helperData";
import type { teamData } from "../types";

export default function Filter({
  year,
  setYear,
  minPA,
  setMinPA,
  setTeamId,
  getData,
}: {
  year: number;
  setYear: (value: number) => void;
  minPA: number;
  setMinPA: (value: number) => void;
  setTeamId: (value: number) => void;
  getData: () => void;
}) {
  return (
    <div className="flex items-center gap-5 mx-auto mt-2">
      <div className="w-fit">
        <Label htmlFor="year">Season</Label>
        <Input
          id="year"
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </div>
      <div className="w-50">
        <Label htmlFor="minPA" className="mb-3">
          Min PA: {minPA}
        </Label>
        <Slider
          id="minPA"
          step={50}
          min={0}
          max={700}
          value={[minPA]}
          onValueChange={(e) => setMinPA(e[0])}
        />
      </div>
      <div>
        <Label>Team</Label>
        <Select onValueChange={(e) => setTeamId(Number(e))}>
          <SelectTrigger>
            <SelectValue placeholder="All Teams" />
          </SelectTrigger>
          <SelectContent>
            {allTeamData.map((team: teamData) => (
              <SelectItem value={String(team.id)} key={team.id}>
                {team.team_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={() => getData()}>
        <RefreshCcw />
      </Button>
    </div>
  );
}
