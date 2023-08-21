import pandas as pd
import math
from sklearn.model_selection import train_test_split
import os
import json

dir_path = os.path.dirname(os.path.realpath(__file__))
train_df = pd.read_csv(dir_path + "/data/x.csv")
test_df = pd.read_csv(dir_path + "/data/y.csv")


# Normalize the 'harga', 'jumlah_terjual', and 'bulan' columns using min-max normalization
def min_max_normalize(column):
    return (column - column.min()) / (column.max() - column.min())


train_df["MinMaxharga"] = min_max_normalize(train_df["harga"])
train_df["MinMaxJumlahTerjual"] = min_max_normalize(train_df["jumlah_terjual"])
train_df["MinMaxBulan"] = min_max_normalize(train_df["bulan"])

test_df["MinMaxharga"] = min_max_normalize(test_df["harga"])
test_df["MinMaxJumlahTerjual"] = min_max_normalize(test_df["jumlah_terjual"])
test_df["MinMaxBulan"] = min_max_normalize(test_df["bulan"])

# Convert DataFrame 'train_df' to an array and then to a list
# train_data = train_df[
#     [
#         "nama_barang",
#         "harga",
#         "jumlah_terjual",
#         "bulan",
#         "rata_rata",
#         "klasifikasi",
#         "MinMaxharga",
#         "MinMaxJumlahTerjual",
#         "MinMaxBulan",
#     ]
# ].values.tolist()

# # Convert DataFrame 'test_df' to an array and then to a list
# test_data = test_df[
#     [
#         "nama_barang",
#         "harga",
#         "jumlah_terjual",
#         "bulan",
#         "rata_rata",
#         "klasifikasi",
#         "MinMaxharga",
#         "MinMaxJumlahTerjual",
#         "MinMaxBulan",
#     ]
# ].values.tolist()

# Create a dictionary for each DataFrame
train_df.to_csv(dir_path + "/data/train_minmax.csv", index=False)
test_df.to_csv(dir_path + "/data/test_minmax.csv", index=False)
out_dict = {
    "x": train_df.to_dict(orient="records"),
    "y": test_df.to_dict(orient="records"),
}

# Convert the dictionary to a JSON string
output_json = json.dumps(out_dict, indent=2)

print(output_json)
