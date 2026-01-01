import requests
import pandas as pd
from typing import Dict


def get_data(endpoint: str, params: Dict[str, str]):
    resp = requests.get("https://statsapi.mlb.com" + endpoint, params=params)
    if resp.status_code != 200:
        return {}

    return resp.json()


def get_all_player_stats(
    year=2025, sportId=1, team_id=None, group="hitting", stats="season"
):
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

    if team_id:
        params["teamId"] = team_id

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


def get_team_schedule(year=2025, team_id=None):
    endpoint = "/api/v1/schedule"
    params = {
        "sportId": 1,
        "season": year,
        "gameType": "R",
        "hydrate": "linescore",
    }
    if team_id:
        params["teamId"] = team_id

    res = get_data(endpoint=endpoint, params=params)
    dates = res.get("dates", [])
    return dates


def get_game_live_feed(gameId):
    endpoint = f"/api/v1.1/game/{gameId}/feed/live"
    params = {}

    res = get_data(endpoint=endpoint, params=params)
    print(res)
