<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Predik extends Model
{
    use HasFactory;
    protected $table = 'predik';

    protected $fillable = [
        'nama_barang',
        'harga',
        'jumlah_terjual',
        'bulan',
        'MinMaxharga',
        'MinMaxJumlahTerjual',
        'MinMaxBulan',
        'prediksi',
    ];
}
