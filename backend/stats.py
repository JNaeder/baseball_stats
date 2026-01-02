import pandas as pd
import api
from stat_formulas import *
from helper_data import *


def get_all_player_hitting_stats(year=2025, team_id=None, sportId=1):
    raw_data = api.get_all_player_stats(
        year=year, team_id=team_id, group="hitting", sportId=sportId
    )
    all_player_data = []

    for data in raw_data:
        stat = data.get("stat")
        team = data.get("team")
        player = data.get("player")
        position = data.get("position")
        parsed_data = {
            "PlayerId": player.get("id"),
            "Name": player.get("fullName"),
            "Team": team.get("name"),
            "TeamId": team.get("id"),
            "Pos": position.get("abbreviation"),
            "Age": stat.get("age"),
            "G": stat.get("gamesPlayed"),
            "R": stat.get("runs"),
            "2B": stat.get("doubles"),
            "3B": stat.get("triples"),
            "HR": stat.get("homeRuns"),
            "SO": stat.get("strikeOuts"),
            "H": stat.get("hits"),
            "BB": stat.get("baseOnBalls"),
            "HBP": stat.get("hitByPitch"),
            "IBB": stat.get("intentionalWalks"),
            "AB": stat.get("atBats"),
            "PA": stat.get("plateAppearances"),
            "RBI": stat.get("rbi"),
            "SF": stat.get("sacFlies"),
        }
        all_player_data.append(parsed_data)

    df = (
        pd.DataFrame(all_player_data)
        .fillna("")
        .pipe(calc_1B)
        .pipe(calc_uBB)
        .pipe(calc_avg)
        .pipe(calc_obp)
        .pipe(calc_slg)
        .pipe(calc_ops)
        .pipe(calc_iso)
        .pipe(calc_woba)
    )

    return df


def get_player_data(player_id):
    data = api.get_player_data(player_id=player_id)

    player_data = {
        "id": player_id,
        "name": data.get("fullName"),
        "birthdate": data.get("birthDate"),
        "currentAge": data.get("currentAge"),
        "birthCountry": data.get("birthCountry"),
        "height": data.get("height"),
        "weight": data.get("weight"),
        "active": data.get("active"),
        "position": data.get("primaryPosition", {}).get("name"),
        "debut": data.get("mlbDebutDate"),
        "bats": data.get("batSide", {}).get("description"),
        "throws": data.get("pitchHand", {}).get("description"),
        "photo_url": f"https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/{player_id}/headshot/67/current",
    }

    stat_data = data.get("stats", [])[0].get("splits")

    all_seasons = []
    for r in stat_data:
        season = r.get("season", "n/a")
        stats = r.get("stat", {})
        team = r.get("team", {})
        all_seasons.append(
            {
                "Season": season,
                "Team": team.get("name"),
                "TeamId": team.get("id"),
                "Age": stats.get("age"),
                "G": stats.get("gamesPlayed"),
                "R": stats.get("runs"),
                "2B": stats.get("doubles"),
                "3B": stats.get("triples"),
                "HR": stats.get("homeRuns"),
                "SO": stats.get("strikeOuts"),
                "H": stats.get("hits"),
                "BB": stats.get("baseOnBalls"),
                "HBP": stats.get("hitByPitch"),
                "IBB": stats.get("intentionalWalks"),
                "AB": stats.get("atBats"),
                "PA": stats.get("plateAppearances"),
                "RBI": stats.get("rbi"),
                "SF": stats.get("sacFlies"),
            }
        )
    df = (
        pd.DataFrame(all_seasons)
        .fillna("")
        .pipe(calc_1B)
        .pipe(calc_uBB)
        .pipe(calc_avg)
        .pipe(calc_obp)
        .pipe(calc_slg)
        .pipe(calc_iso)
        .pipe(calc_woba)
        .pipe(calc_so_perc)
        .pipe(calc_bb_perc)
    )
    player_data["stats"] = df.to_dict(orient="records")

    return player_data


def get_all_standings(year=2025):
    leagues = [103, 104]
    all_standings = []

    for league_id in leagues:
        records = api.get_standings_data(league_id=league_id, year=year)
        for record in records:
            league_id = record.get("league", {}).get("id")
            division_id = record.get("division", {}).get("id")

            league_name = next(
                (l["name"] for l in league_data if l["id"] == league_id), ""
            )

            division_name = next(
                (d["nameShort"] for d in division_data if d["id"] == division_id), ""
            )

            for team in record.get("teamRecords", []):
                team_info = team.get("team", {})
                all_standings.append(
                    {
                        "Id": team_info.get("id"),
                        "Name": team_info.get("name"),
                        "League": league_name,
                        "Division": division_name,
                        "Season": team.get("season"),
                        "G": team.get("gamesPlayed"),
                        "W": team.get("wins"),
                        "L": team.get("losses"),
                        "RS": team.get("runsScored"),
                        "RA": team.get("runsAllowed"),
                        "Clinched": bool(team.get("clinchIndicator")),
                    }
                )
    df = pd.DataFrame(all_standings).fillna("")

    df["W%"] = (df["W"] / df["G"]).round(3)
    df["xW%"] = ((df["RS"] ** 1.83) / (df["RS"] ** 1.83 + df["RA"] ** 1.83)).round(3)
    df["W%Diff"] = (df["W%"] - df["xW%"]).round(3)
    df["RunDiff"] = df["RS"] - df["RA"]

    return df.sort_values(by="xW%", ascending=False)


def get_team_sos(team_id, year=2025):
    schedule = api.get_team_schedule(team_id=team_id, year=year)
    total_games = 0
    total_pct = 0
    for day in schedule:
        for game in day.get("games", []):
            game_status = game.get("status", {}).get("detailedState")
            if game_status != "Final":
                continue
            total_games += 1

            teams = game.get("teams", {})
            is_home = teams.get("home", {}).get("team", {}).get("id") == team_id
            opp_team = teams.get("away", {}) if is_home else teams.get("home", {})
            opp_w_perc = opp_team.get("leagueRecord", {}).get("pct")
            total_pct += float(opp_w_perc)

    return round(total_pct / total_games, 3)


# def get_team_schedule_data(teamId, year):
#     endpoint = "/api/v1/schedule"
#     params = {
#         "sportId": 1,
#         "teamId": teamId,
#         "season": year,
#         "gameType": "R",
#         "hydrate": "linescore",
#     }
#     res = self.get_data(endpoint=endpoint, params=params)
#     games_list = []

#     for date in res.get("dates", []):
#         for game in date.get("games", []):
#             if game.get("status", {}).get("detailedState") != "Final":
#                 continue
#             teams = game.get("teams", {})
#             is_home = teams["home"]["team"]["id"] == teamId
#             main_team = teams["home"] if is_home else teams["away"]
#             opp_team = teams["away"] if is_home else teams["home"]

#             games_list.append(
#                 {
#                     "Date": game.get("officialDate"),
#                     "RunsScored": main_team.get("score", 0),
#                     "RunsAllowed": opp_team.get("score", 0),
#                     "OppTeam": opp_team.get("team", {}).get("name", "n/a"),
#                     "IsWin": 1 if main_team.get("isWinner") else 0,
#                 }
#             )

#     df = pd.DataFrame(games_list)
#     df["Game_Number"] = df.index + 1
#     df["Cum_Wins"] = df["IsWin"].cumsum()
#     df["Cum_Losses"] = df["Game_Number"] - df["Cum_Wins"]
#     df["Cum_Runs_Scored"] = df["RunsScored"].cumsum()
#     df["Cum_Runs_Allowed"] = df["RunsAllowed"].cumsum()
#     df["Win%"] = (df["Cum_Wins"] / df["Game_Number"]).round(3)
#     df["xWin%"] = (
#         (df["Cum_Runs_Scored"] ** 1.83)
#         / (df["Cum_Runs_Scored"] ** 1.83 + df["Cum_Runs_Allowed"] ** 1.83)
#     ).round(3)

#     return df
