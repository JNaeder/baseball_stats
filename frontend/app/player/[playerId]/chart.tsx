"use client";

import type { playerStats } from "@/app/types";
import { type ChartConfig } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

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
        <XAxis
          dataKey="Age"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => String(value).slice(0, 3)}
        />
        <YAxis domain={[0.1, 0.7]} />
        <Line
          dataKey="AVG"
          type="linear"
          stroke="var(--color-AVG)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="OBP"
          type="linear"
          stroke="var(--color-OBP)"
          strokeWidth={2}
          dot={false}
        />
        <Line
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
