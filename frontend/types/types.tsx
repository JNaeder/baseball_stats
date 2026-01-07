import type { playerData } from "./playerTypes";

export type playerListResponse = {
  summary: playerListSummary;
  player_data: playerData[];
};

export type playerListSummary = {
  avg_AVG: number;
  avg_OBP: number;
  avg_OPS: number;
  avg_SLG: number;
  avg_wOBA: number;
  player_count: number;
  total_H: number;
  total_HR: number;
  total_R: number;
  total_RBI: number;
  total_wRAA: number;
  total_RC: number;
};
