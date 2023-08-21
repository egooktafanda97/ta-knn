<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KnnTrain extends Model
{
    use HasFactory;
    protected $table = "knn_trains";
    protected $fillable = [
        'nama_barang',
        'harga',
        'jumlah_terjual',
        'bulan',
        'rata_rata',
        'klasifikasi',
        'MinMaxharga',
        'MinMaxJumlahTerjual',
        'MinMaxBulan',
        'klasifikasi_prediksi',
    ];
}
