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
    <Card className="w-fit bg-blue-50">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div>
            <b>Total RC:</b> {summary.total_RC}
          </div>
          {/* <div>
            <b>Player Count:</b> {summary.player_count}
          </div>
          <div>
            <b>AVG:</b> {summary.avg_AVG}
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
