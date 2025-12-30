export type playerData = {
  id: number;
  name: string;
  birthdate: string;
  currentAge: number;
  birthCountry: string;
  height: string;
  weight: number;
  active: boolean;
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
  RBI: number;
  R: number;
  SF: number;
  SO: number;
  AVG: number;
  OBP: number;
  SLG: number;
  "RBI/PA": number;
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
