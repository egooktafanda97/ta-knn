import sys
import json

# Menerima argumen dari Laravel (data JSON)
if __name__ == "__main__":
    json_data = sys.argv[1]

    # Konversi data JSON menjadi objek Python
    data = json.loads(json_data)

    # Lakukan sesuatu dengan data yang diterima dari Laravel
    # ...

    # Contoh: Tampilkan data yang diterima
    print(data)
