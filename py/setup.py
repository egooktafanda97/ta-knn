import pymysql.cursors
import pymysql
import pandas as pd
import os
import json

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
sql = "SELECT id,nama_barang,harga,jumlah_terjual,bulan FROM barang"
cur.execute(sql)
# Fetch all rows from the result set
rows = cur.fetchall()

# Create a pandas DataFrame from the fetched data
df = pd.DataFrame(rows)
df.to_csv(dir_path + "/data/dataset.csv", index=False)

# Convert the DataFrame to a JSON string
output_json = df.to_json(orient="records", indent=2)

print(output_json)
