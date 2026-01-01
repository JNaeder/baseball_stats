"use client";

import type { playerStats } from "@/app/types";
import { type ChartConfig } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  AVG: {
    label: "AVG",
    color: "#9333ea",
  },
  OBP: {
    label: "OBP",
    color: "#2563eb",
  },
  SLG: {
    label: "SLG",
    color: "#ea580c",
  },
} satisfies ChartConfig;

export default function MyChart({
  playerStats,
}: {
  playerStats: playerStats[];
}) {
  return (
    <ChartContainer config={chartConfig} className="w-150 h-50">
      <LineChart
        accessibilityLayer
        data={playerStats}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <XAxis
          dataKey="Age"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => String(value).slice(0, 3)}
        />
        <YAxis yAxisId="left" domain={["dataMin", "dataMax"]} />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={["dataMin", "dataMax"]}
        />
        <Line
          yAxisId="left"
          dataKey="AVG"
          type="linear"
          stroke="var(--color-AVG)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          yAxisId="left"
          dataKey="OBP"
          type="linear"
          stroke="var(--color-OBP)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          yAxisId="left"
          dataKey="SLG"
          type="linear"
          stroke="var(--color-SLG)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
