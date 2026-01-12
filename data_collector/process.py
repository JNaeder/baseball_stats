import api
from time import sleep


def calc_park_factor(team, year):
    runs_scored = {"home": 0, "away": 0, "total": 0}
    runs_allowed = {"home": 0, "away": 0, "total": 0}
    home_games = 0
    away_games = 0

    team_id = team.get("id")
    team_name = team.get("name")

    all_team_stats = api.get_team_home_away_stats(team_id=team_id, year=year)
    hitting_stats = all_team_stats.get("stats")[0].get("splits", [])
    pitching_stats = all_team_stats.get("stats")[1].get("splits", [])

    for stats in hitting_stats:
        runs = stats.get("stat", {}).get("runs", 0)
        games = stats.get("stat", {}).get("gamesPlayed", 0)
        if stats.get("split", {}).get("code") == "h":
            runs_scored["home"] += runs
            home_games = games
        else:
            runs_scored["away"] += runs
            away_games = games
        runs_scored["total"] += runs

    for stats in pitching_stats:
        runs = stats.get("stat", {}).get("runs", 0)
        if stats.get("split", {}).get("code") == "h":
            runs_allowed["home"] += runs
        else:
            runs_allowed["away"] += runs
        runs_allowed["total"] += runs

    # print(team_name, runs_scored, runs_allowed)
    home = (runs_scored["home"] + runs_allowed["home"]) / home_games
    away = (runs_scored["away"] + runs_allowed["away"]) / away_games
    park_factor = round((home / away) * 100, 1)
    return {"team_name": team_name, "park_factor": park_factor}


def get_all_park_factor(year=2025):
    all_teams = api.get_all_teams_in_season(year=year)
    output = []

    for i in range(len(all_teams)):
        sleep(0.5)
        output.append(calc_park_factor(team=all_teams[i], year=year))
        # print(f"{i+1}/{len(all_teams)}")

    output.sort(key=lambda x: x.get("park_factor"))
    for team in output:
        print(team.get("park_factor"), team.get("team_name"))
