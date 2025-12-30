import requests
import pandas as pd
from typing import Dict


class Stats:
    def __init__(self):
        self._base_url = "https://statsapi.mlb.com"

    def get_data(self, endpoint: str, params: Dict[str, str]):
        resp = requests.get(self._base_url + endpoint, params=params)
        if resp.status_code != 200:
            return {}

        return resp.json()

    def get_player_stats(self, year=2025, sportId=1):
        endpoint = "/api/v1/stats"
        params = {
            "sportId": sportId,
            "stats": "season",
            "group": "hitting",
            "season": year,
            "playerPool": "all",
            "limit": 1000,
        }
        res = self.get_data(endpoint=endpoint, params=params)
        data = res.get("stats", [])[0].get("splits", [])
        arr = []

        for d in data:
            stat = d.get("stat")
            team = d.get("team")
            player = d.get("player")
            new_data = {
                "Name": player.get("fullName"),
                "Team": team.get("name"),
                "TeamId": team.get("id"),
                "Age": stat.get("age"),
                "G": stat.get("gamesPlayed"),
                "R": stat.get("runs"),
                "2B": stat.get("doubles"),
                "3B": stat.get("triples"),
                "HR": stat.get("homeRuns"),
                "SO": stat.get("strikeOuts"),
                "BB": stat.get("baseOnBalls"),
                "H": stat.get("hits"),
                "HBP": stat.get("hitByPitch"),
                "AB": stat.get("atBats"),
                "PA": stat.get("plateAppearances"),
                "RBI": stat.get("rbi"),
                "SF": stat.get("sacFlies"),
            }
            arr.append(new_data)

        return pd.DataFrame(arr)

    def get_team_stats(self, year=2025):
        leagues = [103, 104]
        all_standings = []
        endpoint = "/api/v1/standings"

        for league_id in leagues:
            res = self.get_data(
                endpoint=endpoint, params={"leagueId": league_id, "season": year}
            )
            records = res.get("records", [])
            for record in records:
                for team in record.get("teamRecords", []):
                    team_info = team.get("team", {})
                    all_standings.append(
                        {
                            "Id": team_info.get("id"),
                            "Name": team_info.get("name"),
                            "Season": team.get("season"),
                            "G": team.get("gamesPlayed"),
                            "W": team.get("wins"),
                            "L": team.get("losses"),
                            "RS": team.get("runsScored"),
                            "RA": team.get("runsAllowed"),
                            "Clinched": bool(team.get("clinchIndicator")),
                        }
                    )
        return pd.DataFrame(all_standings)

    def get_team_schedule_data(self, teamId, year):
        endpoint = "/api/v1/schedule"
        params = {
            "sportId": 1,
            "teamId": teamId,
            "season": year,
            "gameType": "R",
            "hydrate": "linescore",
        }
        res = self.get_data(endpoint=endpoint, params=params)
        # print(res)
        games_list = []

        for date in res.get("dates", []):
            for game in date.get("games", []):
                if game.get("status", {}).get("detailedState") != "Final":
                    continue
                teams = game.get("teams", {})
                is_home = teams["home"]["team"]["id"] == teamId
                main_team = teams["home"] if is_home else teams["away"]
                opp_team = teams["away"] if is_home else teams["home"]

                games_list.append(
                    {
                        "Date": game.get("officialDate"),
                        "RunsScored": main_team.get("score", 0),
                        "RunsAllowed": opp_team.get("score", 0),
                        "OppTeam": opp_team.get("team", {}).get("name", "n/a"),
                        "IsWin": 1 if main_team.get("isWinner") else 0,
                    }
                )

        df = pd.DataFrame(games_list)
        df["Game_Number"] = df.index + 1
        df["Cum_Wins"] = df["IsWin"].cumsum()
        df["Cum_Losses"] = df["Game_Number"] - df["Cum_Wins"]
        df["Cum_Runs_Scored"] = df["RunsScored"].cumsum()
        df["Cum_Runs_Allowed"] = df["RunsAllowed"].cumsum()
        df["Win%"] = (df["Cum_Wins"] / df["Game_Number"]).round(3)
        df["xWin%"] = (
            (df["Cum_Runs_Scored"] ** 1.83)
            / (df["Cum_Runs_Scored"] ** 1.83 + df["Cum_Runs_Allowed"] ** 1.83)
        ).round(3)

        return df
