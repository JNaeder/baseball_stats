import type { playerListSummary } from "../types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Summary({
  summary,
}: {
  summary: playerListSummary | undefined;
}) {
  if (!summary) {
    return;
  }
  return (
    <div>
      <Card className="w-full bg-blue-50">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <b>Player Count:</b> {summary.player_count}
          </div>
        </CardContent>
      </Card>
      {/* <div>AVG: {summary.avg_AVG}</div>
      <div>OBP: {summary.avg_OBP}</div>
      <div>SLG: {summary.avg_SLG}</div>
      <div>H: {summary.total_H}</div>
      <div>HR: {summary.total_HR}</div>
      <div>RBI: {summary.total_RBI}</div> */}
    </div>
  );
}
