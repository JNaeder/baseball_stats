import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import type { playerData } from "@/types/playerTypes";

type StatKey = keyof playerData["stats"];

interface ChartTestProps {
  rawData: playerData[];
  xStat?: StatKey;
  yStat?: StatKey;
}

export default function ChartTest({
  rawData,
  xStat = "AVG",
  yStat = "wOBA",
}: ChartTestProps) {
  // Calculate linear regression for trend line
  const n = rawData.length;
  const sumX = rawData.reduce((sum, p) => sum + p.stats[xStat], 0);
  const sumY = rawData.reduce((sum, p) => sum + p.stats[yStat], 0);
  const sumXY = rawData.reduce(
    (sum, p) => sum + p.stats[xStat] * p.stats[yStat],
    0
  );
  const sumX2 = rawData.reduce(
    (sum, p) => sum + p.stats[xStat] * p.stats[xStat],
    0
  );

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Averages for axes
  const avgX = sumX / n;
  const avgY = sumY / n;

  // Get min and max values for both axes
  const minX = Math.min(...rawData.map((p) => p.stats[xStat]));
  const maxX = Math.max(...rawData.map((p) => p.stats[xStat]));
  const minY = Math.min(...rawData.map((p) => p.stats[yStat]));
  const maxY = Math.max(...rawData.map((p) => p.stats[yStat]));

  // Add 5% buffer to each side
  const bufferX = (maxX - minX) * 0.01;
  const bufferY = (maxY - minY) * 0.01;

  const data = [
    {
      id: "Players",
      data: rawData.map((player: playerData) => {
        return {
          x: player.stats[xStat],
          y: player.stats[yStat],
          name: player.player.fullName,
        };
      }),
    },
  ];

  // Custom layer to draw trend line
  const TrendLine = ({ xScale, yScale }: any) => {
    const x1 = xScale(minX);
    const y1 = yScale(slope * minX + intercept);
    const x2 = xScale(maxX);
    const y2 = yScale(slope * maxX + intercept);

    return (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#00413e"
        strokeWidth={5}
        strokeDasharray="5,5"
      />
    );
  };

  // Custom layer to draw average lines for both axes
  const AverageLines = ({ xScale, yScale, innerWidth, innerHeight }: any) => {
    const xPos = xScale(avgX);
    const yPos = yScale(avgY);

    return (
      <g>
        <line
          x1={0}
          x2={innerWidth}
          y1={yPos}
          y2={yPos}
          stroke="#666"
          strokeWidth={2}
          strokeDasharray="4,4"
        />
        <line
          x1={xPos}
          x2={xPos}
          y1={0}
          y2={innerHeight}
          stroke="#666"
          strokeWidth={2}
          strokeDasharray="4,4"
        />
        <text
          x={innerWidth - 8}
          y={yPos - 6}
          textAnchor="end"
          fill="#666"
          fontSize={12}
        >
          avg {yStat}: {avgY.toFixed(3)}
        </text>
        <text x={xPos + 6} y={12} textAnchor="start" fill="#666" fontSize={12}>
          avg {xStat}: {avgX.toFixed(3)}
        </text>
      </g>
    );
  };

  return (
    <div style={{ height: "70vh", width: "100%" }}>
      Slope: {slope.toFixed(4)}
      <ResponsiveScatterPlot /* or ScatterPlot for fixed dimensions */
        data={data}
        margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
        colors={{ scheme: "category10" }}
        xScale={{ type: "linear", min: minX - bufferX, max: maxX + bufferX }}
        yScale={{ type: "linear", min: minY - bufferY, max: maxY + bufferY }}
        axisBottom={{ legend: xStat, legendOffset: 46 }}
        axisLeft={{ legend: yStat, legendOffset: -60 }}
        layers={[
          "grid",
          "axes",
          "nodes",
          TrendLine,
          AverageLines,
          "markers",
          "mesh",
          "legends",
          "annotations",
        ]}
        tooltip={({ node }) => (
          <div
            style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
            }}
          >
            <strong>{node.data.name}</strong>
            <br />
            {xStat}: {node.data.x}
            <br />
            {yStat}: {node.data.y}
          </div>
        )}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            translateX: 130,
            itemWidth: 100,
            itemHeight: 16,
            itemsSpacing: 3,
            symbolShape: "circle",
          },
        ]}
      />
    </div>
  );
}
