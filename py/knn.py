import pandas as pd
import math
from sklearn.model_selection import train_test_split
import os
import json
from sklearn.metrics import confusion_matrix, accuracy_score
import joblib

dir_path = os.path.dirname(os.path.realpath(__file__))
train_df = pd.read_csv(dir_path + "/data/train_minmax.csv")
test_df = pd.read_csv(dir_path + "/data/test_minmax.csv")

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

# Hitung confusion matrix
cm = confusion_matrix(y_true, y_pred, labels=["Laris", "Tidak Laris"])

# Hitung akurasi
accuracy = accuracy_score(y_true, y_pred)

test_df.to_csv(dir_path + "/data/klasifikasi_prediksi.csv", index=False)
# Simpan model KNN ke dalam file
model_filename = "model_knn.joblib"
joblib.dump(knn_classification, dir_path + "/model/" + model_filename)
out_dict = {
    "predictions": test_df.to_dict(orient="records"),
    "cm": cm.tolist(),  # Convert Numpy array to list
    "acuracy": float(accuracy * 100),  # Convert accuracy to float
    "model_name": model_filename,
}

# Convert the dictionary to a JSON string
output_json = json.dumps(out_dict, indent=2)

print(output_json)
# Cetak hasil prediksi pada data uji
# print(
#     test_df[
#         [
#             "nama_barang",
#             "harga",
#             "jumlah_terjual",
#             "klasifikasi",
#             "klasifikasi_prediksi",
#         ]
#     ]
# )
