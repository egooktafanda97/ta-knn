import pandas as pd
import math
from sklearn.model_selection import train_test_split
import os
import json
from sklearn.metrics import confusion_matrix, accuracy_score
import joblib
import sys

# Menerima argumen dari Laravel (data JSON)
if __name__ == "__main__":
    json_data = sys.argv[1]
    data = json.loads(json_data)

dir_path = os.path.dirname(os.path.realpath(__file__))
# Data baru untuk diprediksi (contoh)
new_data = data

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
# Lakukan prediksi dengan data baru
k = 2  # Ubah nilai k sesuai kebutuhan
prediction_new_data = predict_knn(k, train_data, new_data_array)
# Simpan hasil prediksi dalam bentuk dictionary
result = {
    "nama_barang": new_data["nama_barang"],
    "harga": new_data["harga"],
    "jumlah_terjual": new_data["jumlah_terjual"],
    "bulan": new_data["bulan"],
    "MinMaxharga": new_data["MinMaxharga"],
    "MinMaxJumlahTerjual": new_data["MinMaxJumlahTerjual"],
    "MinMaxBulan": new_data["MinMaxBulan"],
    "prediksi": prediction_new_data,
}

# Ubah hasil prediksi menjadi format JSON
result_json = json.dumps(result)
print(result_json)
