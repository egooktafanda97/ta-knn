<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataTrain extends Model
{
    use HasFactory;
    protected $table = "data_train";
    protected $fillable = [
        "barang_id",
        "rata_rata",
        "klasifikasi",
        "MinMaxharga",
        "MinMaxJumlahTerjual",
        "MinMaxBulan",
    ];
}
