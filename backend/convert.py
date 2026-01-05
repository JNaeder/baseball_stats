from csv import DictReader
from pprint import pformat


def convert_csv_to_dict(filename: str):
    output = {}
    with open(filename, "r") as the_file:
        reader = DictReader(the_file)
        for row in reader:
            season = int(row.get("Season"))
            new_row = {}

            for key, value in row.items():
                new_row[key] = float(value)

            output[season] = new_row

    return output


if __name__ == "__main__":
    result = convert_csv_to_dict("./raw_data/weights_by_year.csv")
    with open("weights_data.py", "w", encoding="utf-8") as f:
        f.write("weights_by_year = ")
        f.write(pformat(result, width=120))
        f.write("\n")
