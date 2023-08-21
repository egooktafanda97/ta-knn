<?php

namespace App\Imports;

use App\Models\knn;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;

class DataImport implements ToModel
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new knn([
            "nama_barang" => $row[0],
            "harga" => $row[1],
            "jumlah_terjual" => $row[2],
            "bulan" => $row[3],
        ]);
    }
}
