import pandas as pd
import math
from sklearn.model_selection import train_test_split
import os
import json

dir_path = os.path.dirname(os.path.realpath(__file__))
data = pd.read_csv(dir_path + "/data/dataU_with_klasifikasi.csv")
# Select unique nama_barang to choose different items for train-test split
unique_nama_barang = data["nama_barang"].unique()

# Lists to store train and test data
train_data = []
test_data = []

# Split data for each unique nama_barang
for nama_barang in unique_nama_barang:
    nama_barang_data = data[data["nama_barang"] == nama_barang]
    train, test = train_test_split(nama_barang_data, test_size=0.1, random_state=1)
    train_data.append(train)
    test_data.append(test)

# Concatenate the train and test data back together
train_df = pd.concat(train_data)
test_df = pd.concat(test_data)
train_df.to_csv(dir_path + "/data/x.csv", index=False)
test_df.to_csv(dir_path + "/data/y.csv", index=False)
# Create a dictionary for each DataFrame
out_dict = {
    "x": train_df.to_dict(orient="records"),
    "y": test_df.to_dict(orient="records"),
}

# Convert the dictionary to a JSON string
output_json = json.dumps(out_dict, indent=2)

print(output_json)
