import pandas as pd
import math
from sklearn.model_selection import train_test_split
import os
import json

dir_path = os.path.dirname(os.path.realpath(__file__))
# Membaca data dari file CSV
data = pd.read_csv(dir_path + "/data/dataset.csv")

# Convert the 'harga' column to numeric
data["harga"] = data["harga"].str.replace(",", "").astype(float)

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


# Convert DataFrame 'train_df' to an array
train_data = train_df[["MinMaxharga", "MinMaxJumlahTerjual", "MinMaxBulan"]].values

# Convert DataFrame 'test_df' to an array
test_data = test_df[["MinMaxharga", "MinMaxJumlahTerjual", "MinMaxBulan"]].values


# Function to calculate Euclidean distance between two points
def euclidean_distance(x, y):
    return math.sqrt((x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2)


# List untuk menyimpan hasil perhitungan Euclidean Distance
distances = []

# Perhitungan Euclidean Distance untuk data test_data terhadap data di train_data
for i, test_point in enumerate(test_data):
    distances_to_train = []
    for j, train_point in enumerate(train_data):
        distance = euclidean_distance(test_point, train_point)
        distances_to_train.append(
            (j, distance)
        )  # Simpan indeks data train dan jarak Euclidean
    distances.append(
        (i, distances_to_train)
    )  # Simpan indeks data test dan hasil jarak Euclidean


# Fungsi untuk melakukan klasifikasi menggunakan algoritma KNN
k = 2


def knn_classification(distances, k):
    predictions = []
    for i, test_point_distances in distances:
        # Ambil k data latih terdekat berdasarkan hasil perhitungan Euclidean Distance
        k_nearest_neighbors = sorted(test_point_distances, key=lambda x: x[1])[:k]
        # Ambil indeks data latih terdekat
        nearest_indices = [index for index, _ in k_nearest_neighbors]
        # Ambil klasifikasi dari data latih terdekat
        nearest_labels = train_df.iloc[nearest_indices]["klasifikasi"].values
        # Tentukan klasifikasi mayoritas
        prediction = (
            "Laris" if (nearest_labels == "Laris").sum() > k / 2 else "Tidak Laris"
        )
        predictions.append(prediction)
    return predictions


# Lakukan klasifikasi pada data uji menggunakan KNN
predictions = knn_classification(distances, k)

# Tambahkan kolom 'klasifikasi_prediksi' pada test_df untuk menyimpan hasil prediksi
test_df["klasifikasi_prediksi"] = predictions

y_true = test_df["klasifikasi"].values
y_pred = test_df["klasifikasi_prediksi"].values


new_data = {"harga": 150000, "jumlah_terjual": 25, "bulan": 6}
train_df = pd.read_csv(dir_path + "/data/train_minmax.csv")
# Normalisasi data baru menggunakan min-max normalization (gunakan nilai min-max dari data latih)
new_data["MinMaxharga"] = (new_data["harga"] - train_df["harga"].min()) / (
    train_df["harga"].max() - train_df["harga"].min()
)
new_data["MinMaxJumlahTerjual"] = (
    new_data["jumlah_terjual"] - train_df["jumlah_terjual"].min()
) / (train_df["jumlah_terjual"].max() - train_df["jumlah_terjual"].min())
new_data["MinMaxBulan"] = (new_data["bulan"] - train_df["bulan"].min()) / (
    train_df["bulan"].max() - train_df["bulan"].min()
)

# Ubah data baru menjadi bentuk array untuk perhitungan Euclidean distance
new_data_array = [
    new_data["MinMaxharga"],
    new_data["MinMaxJumlahTerjual"],
    new_data["MinMaxBulan"],
]


# Function to calculate Euclidean distance between two points
def euclidean_distance(x, y):
    return math.sqrt((x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2)


# Fungsi untuk mendapatkan klasifikasi prediksi dengan data baru
def predict_knn(k, train_data, new_data):
    distances_to_train = []
    for j, train_point in enumerate(train_data):
        distance = euclidean_distance(new_data, train_point)
        distances_to_train.append((j, distance))
    # Urutkan berdasarkan jarak dan ambil k data latih terdekat
    sorted_distances = sorted(distances_to_train, key=lambda x: x[1])[:k]
    # Ambil indeks data latih terdekat
    nearest_indices = [index for index, _ in sorted_distances]
    # Ambil klasifikasi dari data latih terdekat
    nearest_labels = train_df.iloc[nearest_indices]["klasifikasi"].values
    # Tentukan klasifikasi mayoritas sebagai prediksi
    prediction = "Laris" if (nearest_labels == "Laris").sum() > k / 2 else "Tidak Laris"
    return prediction


train_data = train_df[["MinMaxharga", "MinMaxJumlahTerjual", "MinMaxBulan"]].values

k = 2
prediction_new_data = predict_knn(k, train_data, new_data_array)
