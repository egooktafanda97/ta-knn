<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('preprocessing', function (Blueprint $table) {
            $table->id();
            $table->string('nama_barang');
            $table->string('harga');
            $table->integer('jumlah_terjual');
            $table->string('bulan');
            $table->string('rata_rata');
            $table->string('klasifikasi');
            $table->string('MinMaxharga');
            $table->string('MinMaxJumlahTerjual');
            $table->string('MinMaxBulan');
            $table->string('JenisData');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('preprocessing');
    }
};
