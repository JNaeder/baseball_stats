def grab_stat_data(stats):
    return {
        "G": stats.get("gamesPlayed"),
        "GO": stats.get("groundOuts"),
        "AO": stats.get("airOuts"),
        "R": stats.get("runs"),
        "2B": stats.get("doubles"),
        "3B": stats.get("triples"),
        "HR": stats.get("homeRuns"),
        "SO": stats.get("strikeOuts"),
        "BB": stats.get("baseOnBalls"),
        "IBB": stats.get("intentionalWalks"),
        "H": stats.get("hits"),
        "HBP": stats.get("hitByPitch"),
        "AB": stats.get("atBats"),
        "CS": stats.get("caughtStealing"),
        "SB": stats.get("stolenBases"),
        "GDP": stats.get("groundIntoDoublePlay"),
        "P": stats.get("numberOfPitches"),
        "PA": stats.get("plateAppearances"),
        "RBI": stats.get("rbi"),
        "LOB": stats.get("leftOnBase"),
        "SH": stats.get("sacBunts"),
        "SF": stats.get("sacFlies"),
        "CI": stats.get("carchersInterference"),
    }


def grab_team_data(team):
    return {
        "id": team.get("id"),
        "season": team.get("season"),
        "fullName": team.get("name"),
        "shortName": team.get("teamName"),
        "abbreviation": team.get("abbreviation"),
    }


def grab_player_data(player):
    return {
        "id": player.get("id"),
        "fullName": player.get("fullName"),
        "firstName": player.get("firstName"),
        "lastName": player.get("lastName"),
        "birthDate": player.get("birthDate"),
        "currentAge": player.get("currentAge"),
        "birthCountry": player.get("birthCountry"),
        "height": player.get("height"),
        "weight": player.get("weight"),
        "active": player.get("active"),
        "bats": player.get("batSide", {}).get("description"),
        "throws": player.get("pitchHand", {}).get("description"),
        "photo_url": f"https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/{player.get("id")}/headshot/67/current",
    }


def grab_position_data(position):
    return {
        "name": position.get("name"),
        "type": position.get("type"),
        "abbreviation": position.get("abbreviation"),
    }
