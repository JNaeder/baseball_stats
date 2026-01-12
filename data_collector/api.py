import requests
import pandas as pd
from typing import Dict


def get_data(endpoint: str, params: Dict[str, str]):
    resp = requests.get("https://statsapi.mlb.com" + endpoint, params=params)
    if resp.status_code != 200:
        return resp.content.decode()

    return resp.json()


def get_all_teams_in_season(year=2025):
    endpoint = f"/api/v1/teams"
    params = {
        "season": year,
        "sportId": 1,
    }
    res = get_data(endpoint=endpoint, params=params)
    all_teams = res.get("teams", [])
    return all_teams


def get_team_home_away_stats(team_id, year=2025):
    endpoint = f"/api/v1/teams/{team_id}/stats"
    params = {
        "gameType": "R",
        "stats": "statSplits",
        "sitCodes": "h,a",
        "group": "hitting,pitching",
        "season": year,
        "sportId": 1,
    }

    res = get_data(endpoint=endpoint, params=params)
    return res
