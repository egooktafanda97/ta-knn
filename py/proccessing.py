import pandas as pd
import math
from sklearn.model_selection import train_test_split
import os
import json
import pymysql.cursors
import pymysql

dir_path = os.path.dirname(os.path.realpath(__file__))


dir_path = os.path.dirname(os.path.realpath(__file__))

# Connect to the database
connection = pymysql.connect(
    host="localhost",
    user="root",
    port=3307,
    password="root",
    db="knn_ta",
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor,
)

cur = connection.cursor(pymysql.cursors.DictCursor)
sql = "SELECT id,nama_barang,harga,jumlah_terjual,bulan FROM data"
cur.execute(sql)
# Fetch all rows from the result set
rows = cur.fetchall()

# Create a pandas DataFrame from the fetched data
df = pd.DataFrame(rows)
df.to_csv(dir_path + "/data/dataset.csv", index=False)

# Convert the DataFrame to a JSON string
# output_json = df.to_json(orient="records", indent=2)


# Membaca data dari file CSV
data = pd.read_csv(dir_path + "/data/dataset.csv")

# Calculate the average (rata-rata) for each nama_barang
rata_rata = data.groupby("nama_barang")["jumlah_terjual"].mean().reset_index()
rata_rata.rename(columns={"jumlah_terjual": "rata_rata"}, inplace=True)

# Merge the rata_rata DataFrame with the original DataFrame
data = pd.merge(data, rata_rata, on="nama_barang")

# Add a new column for klasifikasi laris/tidak laris
data["klasifikasi"] = data.apply(
    lambda row: "Laris" if row["jumlah_terjual"] >= row["rata_rata"] else "Tidak Laris",
    axis=1,
)
# data.to_csv(dir_path + "/data/dataU_with_klasifikasi.csv", index=False)
# print(data.to_json(orient="records", lines=False))


# Select unique nama_barang to choose different items for train-test split
unique_nama_barang = data["nama_barang"].unique()

# Lists to store train and test data
train_data = []
test_data = []

# Split data for each unique nama_barang
for nama_barang in unique_nama_barang:
    nama_barang_data = data[data["nama_barang"] == nama_barang]
    train, test = train_test_split(nama_barang_data, test_size=0.2, random_state=42)
    train_data.append(train)
    test_data.append(test)

# Concatenate the train and test data back together
train_df = pd.concat(train_data)
test_df = pd.concat(test_data)


# Normalize the 'harga', 'jumlah_terjual', and 'bulan' columns using min-max normalization
def min_max_normalize(column):
    return (column - column.min()) / (column.max() - column.min())


train_df["MinMaxharga"] = min_max_normalize(train_df["harga"])
train_df["MinMaxJumlahTerjual"] = min_max_normalize(train_df["jumlah_terjual"])
train_df["MinMaxBulan"] = min_max_normalize(train_df["bulan"])

test_df["MinMaxharga"] = min_max_normalize(test_df["harga"])
test_df["MinMaxJumlahTerjual"] = min_max_normalize(test_df["jumlah_terjual"])
test_df["MinMaxBulan"] = min_max_normalize(test_df["bulan"])
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
