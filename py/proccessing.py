import pandas as pd
import math
from sklearn.model_selection import train_test_split
import os
import json
import pymysql.cursors
import pymysql

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
sql = "SELECT id,nama_barang,harga,jumlah_terjual,bulan,klasifikasi FROM data"
cur.execute(sql)
# Fetch all rows from the result set
rows = cur.fetchall()


# Create a pandas DataFrame from the fetched data
df = pd.DataFrame(rows)
df.to_csv(dir_path + "/data/dataset.csv", index=False)

data = pd.read_csv(dir_path + "/data/dataset.csv")

rata_rata = data.groupby("nama_barang")["jumlah_terjual"].mean().reset_index()
rata_rata.rename(columns={"jumlah_terjual": "rata_rata"}, inplace=True)

data = pd.merge(data, rata_rata, on="nama_barang")


def min_max_normalize(column):
    return (column - column.min()) / (column.max() - column.min())


data["MinMaxharga"] = min_max_normalize(data["harga"])
data["MinMaxJumlahTerjual"] = min_max_normalize(data["jumlah_terjual"])
data["MinMaxBulan"] = 0
# data["MinMaxBulan"] = min_max_normalize(data["bulan"])

# print(data["MinMaxBulan"])
data.to_csv(dir_path + "/data/train_minmax.csv", index=False)

out_dict = {"x": data.to_dict(orient="records")}

output_json = json.dumps(out_dict, indent=1)

print(output_json)
