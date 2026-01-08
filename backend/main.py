import stats
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from stat_formulas import *


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
    player_data = stats.get_all_player_hitting_stats(
        year=year, team_id=team_id, sportId=1
    )
    # sorted_data = player_data.loc[(player_data["PA"] > int(min_pa))]
    sorted_data = [
        player
        for player in player_data
        if player.get("stats", {}).get("PA") > int(min_pa)
    ]
    output = {
        # "summary": {
        #     "player_count": len(sorted_data),
        #     "avg_AVG": round(
        #         int(sorted_data["H"].sum()) / int(sorted_data["AB"].sum()), 3
        #     ),
        #     "avg_OBP": round(sorted_data["OBP"].mean(), 3),
        #     "avg_SLG": round(sorted_data["SLG"].mean(), 3),
        #     "avg_OPS": round(sorted_data["OPS"].mean(), 3),
        #     "avg_wOBA": round(sorted_data["wOBA"].mean(), 3),
        #     "total_HR": int(sorted_data["HR"].sum()),
        #     "total_H": int(sorted_data["H"].sum()),
        #     "total_RBI": int(sorted_data["RBI"].sum()),
        #     "total_R": int(sorted_data["R"].sum()),
        #     "total_wRAA": round((sorted_data["wRAA"].sum()), 3),
        #     "total_RC": round(sorted_data["RC"].sum(), 1),
        # },
        "player_data": sorted_data
    }
    return output


@app.get("/all_standings_by_year/{year}")
def get_all_standings_by_year(year):
    team_data = stats.get_all_standings(year=year)

    return team_data.to_dict(orient="records")


@app.get("/get_player_stats/{player_id}")
def get_player_stats(player_id):
    player_data = stats.get_player_data(player_id=player_id)
    return player_data


@app.get("/get_team_stats/{team_id}/{year}")
def get_team_stats(team_id, year):
    team_data = stats.get_team_data(team_id=int(team_id), year=int(year))
    print(team_data)
    return team_data


# if __name__ == "__main__":
#     stats.get_player_data(player_id=543807)
# stats.get_all_player_hitting_stats(year=2025)
# stats.get_all_standings()
# stats.get_team_data(team_id=117)
