import stats
from helper_data import team_data
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/all_player_stats_by_year/{year}")
def get_all_player_stats_by_year(year, min_pa=500, team_id=None):
    player_data = stats.get_all_player_hitting_stats(year=year, team_id=team_id)
    sorted_data = player_data.loc[(player_data["PA"] > int(min_pa))]
    output = {
        "summary": {
            "player_count": len(sorted_data),
            "avg_AVG": round(
                int(sorted_data["H"].sum()) / int(sorted_data["AB"].sum()), 3
            ),
            "avg_OBP": round(sorted_data["OBP"].mean(), 3),
            "avg_SLG": round(sorted_data["SLG"].mean(), 3),
            "avg_OPS": round(sorted_data["OPS"].mean(), 3),
            "avg_wOBA": round(sorted_data["wOBA"].mean(), 3),
            "total_HR": int(sorted_data["HR"].sum()),
            "total_H": int(sorted_data["H"].sum()),
            "total_RBI": int(sorted_data["RBI"].sum()),
            "total_R": int(sorted_data["R"].sum()),
        },
        "player_data": sorted_data.to_dict(orient="records"),
    }
    return output


@app.get("/all_standings_by_year/{year}")
def get_all_standings_by_year(year):
    team_data = stats.get_all_standings()

    return team_data.to_dict(orient="records")


@app.get("/get_player_stats/{player_id}")
def get_player_stats(player_id):
    player_data = stats.get_player_data(player_id=player_id)
    return player_data


# if __name__ == "__main__":
#     # api.get_team_schedule()
#     api.get_game_live_feed(gameId=778563)
# stats.get_all_player_hitting_stats()
# stats.get_player_data(player_id=553993)
# stats.get_team_sos(team_id=121, year=2025)

# team_id = 133
# year = 2025

# team_name = next((team for team in team_data if team["id"] == team_id)).get(
#     "team_name"
# )

# all_games = Stats().get_team_schedule_data(teamId=team_id, year=year)
# all_games.to_csv(f"{team_name}_{year}.csv", index=False)
# year = 2025

# data = Stats().get_team_stats(year=year)
# team_playoffs = data.set_index("Id")["Clinched"].to_dict()

# data["W%"] = data["W"] / data["G"]
# data["xW%"] = (data["RS"]**1.83) / ((data["RS"]**1.83) + (data["RA"]**1.83))
# data["xW"] =  round(data["G"] * data["xW%"])
# data["Luck"] = data["W"] - data["xW"]
# print(data)

# data = Stats().get_player_stats(year=year)

# data["AVG"] = round(data["H"] / data["AB"], 3)
# data["1B"] = data["H"] - (data["2B"] + data["3B"] + data["HR"])
# data["SLG"] = round(
#     (data["1B"] + (2 * data["2B"]) + (3 * data["3B"]) + (4 * data["HR"]))
#     / data["AB"],
#     3,
# )
# data["ISO"] = data["SLG"] - data["AVG"]
# data["OBP"] = round(
#     (data["H"] + data["BB"] + data["HBP"])
#     / (data["AB"] + data["BB"] + data["HBP"] + data["SF"]),
#     3,
# )
# data["OPS"] = data["SLG"] + data["OBP"]

# data["SO/H"] = round(data["SO"] / data["H"], 3)

# print(
#     data.loc[
#         (data["TeamId"].map(team_playoffs) == False) & (data["PA"] > 300),
#         ["Name", "Team", "Age", "OPS"],
#     ]
#     .sort_values(by="OPS", ascending=False)
#     .head(10)
# )
# print(
#     data.loc[
#         (data["PA"] > 500),
#         ["Name", "SO/H", "OBP", "AVG", "PA"],
#     ]
#     .sort_values(by="SO/H", ascending=False)
#     .head(10)
# )

# result = (
#     data.loc[data["PA"] > 200]
#     .groupby("Team")[["AVG", "OBP", "SLG", "OPS", "ISO"]]
#     .mean()
#     .rank(ascending=False)
#     .astype(int)
#     .sort_values(by="SLG")
# )
# print(result)
# teams = []

# team_data = Stats().get_data(endpoint="/api/v1/teams", params={"sportId": 1})
# for team in team_data.get("teams"):
#     teams.append(
#         {
#             "id": team.get("id"),
#             "full_name": team.get("name"),
#             "abbreviation": team.get("abbreviation"),
#             "team_name": team.get("teamName"),
#         }
#     )
# print(teams)
