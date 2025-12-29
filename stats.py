import requests
import pandas as pd
from typing import Dict


class Stats:
    def __init__(self):
        self._base_url = "https://statsapi.mlb.com"

    def get_data(self, endpoint: str, params: Dict[str:str]):
        resp = requests.get(self._base_url + endpoint, params=params)
        if resp.status_code != 200:
            return
        
        return resp.json()

    def get_player_stats(self, year=2025):
        endpoint = "/api/v1/stats"
        params = {
            "stats": "season",
            "group": "hitting",
            "season": year,
            "playerPool": "all",
            "limit": 1000
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
            res = self.get_data(endpoint=endpoint, params={"leagueId": league_id, "season": year})
            records = res.get("records", [])
            for record in records:
                for team in record.get("teamRecords", []):
                    team_info = team.get("team", {})
                    all_standings.append({
                        "Id": team_info.get("id"),
                        "Name": team_info.get("name"),
                        "Season": team.get("season"),
                        "G": team.get("gamesPlayed"),
                        "W": team.get("wins"),
                        "L": team.get("losses"),
                        "RS": team.get("runsScored"),
                        "RA": team.get("runsAllowed"),
                        "Clinched": bool(team.get("clinchIndicator"))
                    })
        return pd.DataFrame(all_standings)
