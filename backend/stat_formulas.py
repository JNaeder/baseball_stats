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


def calc_woba(df: DataFrame):
    def row_woba(r):
        weights = weights_by_year[int(r["Season"])]
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


def calc_wraa(df: DataFrame, year):
    weights = weights_by_year[int(year)]
    league_woba = weights["wOBA"]
    woba_scale = weights["wOBAScale"]
    df["wRAA"] = (((df["wOBA"] - league_woba) / woba_scale) * df["PA"]).round(3)

    return df
