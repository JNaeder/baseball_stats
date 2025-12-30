import requests
import pandas as pd
from typing import Dict


def get_data(endpoint: str, params: Dict[str, str]):
    resp = requests.get("https://statsapi.mlb.com" + endpoint, params=params)
    if resp.status_code != 200:
        return {}

    return resp.json()


def get_all_player_stats(year=2025, sportId=1, group="hitting", stats="season"):
    endpoint = "/api/v1/stats"
    params = {
        "sportId": sportId,
        "stats": stats,
        "group": group,
        "season": year,
        "playerPool": "all",
        "limit": 1000,
        "hydrate": "hydrations",
    }
    res = get_data(endpoint=endpoint, params=params)
    data = res.get("stats", [])[0].get("splits", [])
    return data


def get_player_data(player_id):
    # endpoint = f"/api/v1/people/{player_id}/stats"
    endpoint = f"/api/v1/people/{player_id}"
    params = {"sportId": 1, "hydrate": "stats(group=[hitting],type=[yearByYear])"}

    res = get_data(endpoint=endpoint, params=params)
    data = res.get("people", [])[0]
    return data


def get_standings_data(league_id, year=2025):
    endpoint = "/api/v1/standings"
    res = get_data(
        endpoint=endpoint,
        params={
            "leagueId": league_id,
            "season": year,
        },
    )
    records = res.get("records", [])
    return records


def get_team_schedule(team_id, year):
    endpoint = "/api/v1/schedule"
    params = {
        "sportId": 1,
        "teamId": team_id,
        "season": year,
        "gameType": "R",
        "hydrate": "linescore",
    }
    res = get_data(endpoint=endpoint, params=params)
    dates = res.get("dates", [])
    return dates
