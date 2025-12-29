from stats import Stats


if __name__ == "__main__":
    year = 2025

    data = Stats().get_team_stats(year=year)
    team_playoffs = data.set_index("Id")["Clinched"].to_dict()

    # data["W%"] = data["W"] / data["G"]
    # data["xW%"] = (data["RS"]**1.83) / ((data["RS"]**1.83) + (data["RA"]**1.83))
    # data["xW"] =  round(data["G"] * data["xW%"])
    # data["Luck"] = data["W"] - data["xW"]
    # print(data)

    data = Stats().get_player_stats(year=year)

    data["AVG"] = round(data["H"] / data["AB"], 3)
    data["1B"] = data["H"] - (data["2B"] + data["3B"] + data["HR"])
    data["SLG"] = round(
        (data["1B"] + (2 * data["2B"]) + (3 * data["3B"]) + (4 * data["HR"]))
        / data["AB"],
        3,
    )
    data["ISO"] = data["SLG"] - data["AVG"]
    data["OBP"] = round(
        (data["H"] + data["BB"] + data["HBP"])
        / (data["AB"] + data["BB"] + data["HBP"] + data["SF"]),
        3,
    )
    data["OPS"] = data["SLG"] + data["OBP"]

    data["SO/H"] = round(data["SO"] / data["H"], 3)

    # print(data.loc[(data["TeamId"].map(team_playoffs) == False) & (data["PA"] > 300) & (data["Age"] >= 30), ["Name", "Team", "Age", "OPS"]].sort_values(by="OPS", ascending=False).head(10))
    # print(
    #     data.loc[
    #         (data["PA"] > 500),
    #         ["Name", "SO/H", "OBP", "AVG", "PA"],
    #     ]
    #     .sort_values(by="SO/H", ascending=True)
    #     .head(10)
    # )

    result = (
        data.loc[data["PA"] > 200]
        .groupby("Team")[["AVG", "OBP", "SLG", "OPS", "ISO"]]
        .mean()
        .rank(ascending=False)
        .astype(int)
        .sort_values(by="SLG")
    )
    print(result)
