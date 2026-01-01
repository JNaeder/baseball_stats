export type playerListResponse = {
  summary: playerListSummary;
  player_data: playerStats[];
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
};

export type teamData = {
  id: number;
  full_name: string;
  abbreviation: string;
  team_name: string;
};

export type playerData = {
  id: number;
  name: string;
  birthdate: string;
  currentAge: number;
  birthCountry: string;
  height: string;
  weight: number;
  active: boolean;
  position: string;
  debut: string;
  bats: string;
  throws: string;
  photo_url: string;
  stats: playerStats[];
};

export type playerStats = {
  PlayerId: number;
  Name: string;
  Age: number;
  Team: string;
  TeamId: number;
  Pos: string;
  G: number;
  PA: number;
  AB: number;
  H: number;
  "2B": number;
  "3B": number;
  HR: number;
  BB: number;
  HBP: number;
  IBB: number;
  RBI: number;
  R: number;
  SF: number;
  SO: number;
  AVG: number;
  OBP: number;
  SLG: number;
  ISO: number;
  OPS: number;
  wOBA: number;
  "SO%": number;
  "BB%": number;
};

export type teamStanding = {
  Id: number;
  Name: string;
  Season: number;
  G: number;
  W: number;
  L: number;
  RS: number;
  RA: number;
  Clinched: boolean;
  "W%": number;
  "xW%": number;
};
