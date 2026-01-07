import type { teamData } from "./teamTypes";

export type playerData = {
  season: number;
  stats: playerStats;
  team: teamData;
  player: playerInfo;
  position: positionInfo;
};

export type playerInfo = {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  currentAge: number;
  birthCountry: string;
  height: string;
  weight: number;
  active: boolean;
  bats: string;
  throws: string;
  photo_url: string;
};

export type positionInfo = {
  name: string;
  type: string;
  abbreviation: string;
};

export type playerStats = {
  G: number;
  GO: number;
  AO: number;
  R: number;
  "2B": number;
  "3B": number;
  HR: number;
  SO: number;
  BB: number;
  IBB: number;
  H: number;
  HBP: number;
  AB: number;
  CS: number;
  SB: number;
  GDP: number;
  P: number;
  PA: number;
  RBI: number;
  LOB: number;
  SH: number;
  SF: number;
  CI: number;
  AVG: number;
  OBP: number;
  SLG: number;
  ISO: number;
  OPS: number;
  wOBA: number;
  "SO%": number;
  "BB%": number;
  wRAA: number;
  RC: number;
};
