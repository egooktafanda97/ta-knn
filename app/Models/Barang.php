<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    use HasFactory;
    // Nama tabel di database
    protected $table = 'barang';

    // Kolom-kolom yang dapat diisi (fillable)
    protected $fillable = [
        'nama_barang',
        'harga',
        'jumlah_terjual',
        'bulan',
    ];
}
