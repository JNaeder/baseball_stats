from pandas import DataFrame
from helper_data.weights_data import weights_by_year


def calc_uBB(df: DataFrame):
    df["uBB"] = df["BB"] - df["IBB"]
    return df


def calc_1B(df: DataFrame):
    df["1B"] = df["H"] - (df["2B"] + df["3B"] + df["HR"])
    return df


def calc_obp(df: DataFrame):
    df["OBP"] = (
        (df["H"] + df["BB"] + df["HBP"]) / (df["AB"] + df["BB"] + df["HBP"] + df["SF"])
    ).round(3)
    return df


def calc_avg(df: DataFrame):
    df["AVG"] = (df["H"] / df["AB"]).round(3)
    return df


def calc_slg(df: DataFrame):
    total_bases = (df["1B"]) + (2 * df["2B"]) + (3 * df["3B"] + (4 * df["HR"]))
    df["SLG"] = (total_bases / df["AB"]).round(3)
    return df


def calc_ops(df: DataFrame):
    df["OPS"] = (df["OBP"] + df["SLG"]).round(3)
    return df


def calc_iso(df: DataFrame):
    df["ISO"] = (df["SLG"] - df["AVG"]).round(3)
    return df


def calc_so_perc(df: DataFrame):
    df["SO%"] = ((df["SO"] / df["PA"]) * 100).round(2)
    return df


def calc_bb_perc(df: DataFrame):
    df["BB%"] = ((df["BB"] / df["PA"]) * 100).round(2)
    return df


def calc_hr_perc(df: DataFrame):
    df["HR%"] = ((df["HR"] / df["PA"]) * 100).round(2)
    return df


def calc_woba(df: DataFrame):
    def row_woba(r):
        weights = weights_by_year[int(r["season"])]
        num = (
            (r["uBB"] * weights["wBB"])
            + (r["HBP"] * weights["wHBP"])
            + (r["1B"] * weights["w1B"])
            + (r["2B"] * weights["w2B"])
            + (r["3B"] * weights["w3B"])
            + (r["HR"] * weights["wHR"])
        )
        den = r["AB"] + r["uBB"] + r["SF"] + r["HBP"]
        if not den:
            return 0
        return round(num / den, 3)

    df["wOBA"] = df.apply(row_woba, axis=1)

    return df


def calc_wraa(df: DataFrame):
    def row_wraa(r):
        weights = weights_by_year[int(r["season"])]
        league_woba = weights["wOBA"]
        woba_scale = weights["wOBAScale"]
        return round(((r["wOBA"] - league_woba) / woba_scale) * r["PA"], 1)

    df["wRAA"] = df.apply(row_wraa, axis=1)
    return df


def calc_rc(df: DataFrame):
    on_base = df["H"] + df["BB"] - df["CS"] + df["HBP"] - df["GDP"]
    total_bases = df["1B"] + (2 * df["2B"]) + (3 * df["3B"]) + (4 * df["HR"])
    walk_value = 0.26 * (df["BB"] - df["IBB"] + df["HBP"])
    sacrifice_value = 0.52 * (df["SH"] + df["SF"] + df["SB"])
    bottom = df["AB"] + df["BB"] + df["HBP"] + df["SF"] + df["SH"]

    df["RC"] = round(
        (on_base * (total_bases + walk_value + sacrifice_value)) / bottom, 1
    )
    return df


def calc_wRC(df: DataFrame):
    def row_wRC(r):
        weights = weights_by_year[int(r["season"])]
        league_woba = weights["wOBA"]
        woba_scale = weights["wOBAScale"]
        league_R_PA = weights["R/PA"]
        return round(
            (((r["wOBA"] - league_woba) / woba_scale) + (league_R_PA)) * r["PA"], 0
        )

    df["wRC"] = df.apply(row_wRC, axis=1)
    return df


def calc_wRC_plus(df: DataFrame):
    def row_wRC_plus(r):
        if r["PA"] == 0:
            return 0
        weights = weights_by_year[int(r["season"])]
        league_R_PA = weights["R/PA"]
        output = (r["wRAA"] / r["PA"]) + league_R_PA
        return output

    df["wRC+"] = df.apply(row_wRC_plus, axis=1)
    return df
