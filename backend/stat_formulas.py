from pandas import DataFrame


def calc_woba(df: DataFrame):
    """ """
    df["wOBA"] = (
        (
            (df["uBB"] * 0.691)
            + (df["HBP"] * 0.722)
            + (df["1B"] * 0.882)
            + (df["2B"] * 1.252)
            + (df["3B"] * 1.584)
            + (df["HR"] * 2.037)
        )
        / (df["AB"] + df["uBB"] + df["SF"] + df["HBP"])
    ).round(3)

    return df


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
