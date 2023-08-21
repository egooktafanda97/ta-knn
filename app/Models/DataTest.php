<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataTest extends Model
{
    use HasFactory;
    protected $table = "data_test";
    protected $fillable = [
        "barang_id",
        "rata_rata",
        "klasifikasi",
        "MinMaxharga",
        "MinMaxJumlahTerjual",
        "MinMaxBulan",
    ];
}
