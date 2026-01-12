export type teamData = {
  id: number;
  season?: number;
  fullName: string;
  shortName: string;
  abbreviation: string;
};

export type teamStanding = {
  Id: number;
  Name: string;
  League: string;
  Division: string;
  Season: number;
  G: number;
  W: number;
  L: number;
  RS: number;
  RA: number;
  RunDiff: number;
  Clinched: boolean;
  "W%": number;
  "xW%": number;
  "W%Diff": number;
};
