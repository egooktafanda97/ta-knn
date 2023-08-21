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
        Schema::create('knn', function (Blueprint $table) {
            $table->id();
            $table->string('nama_barang')->nullable();
            $table->string('harga')->nullable();
            $table->string('jumlah_terjual')->nullable();
            $table->string('bulan')->nullable();
            $table->string('rata_rata')->nullable();
            $table->string('klasifikasi')->nullable();
            $table->string('MinMaxharga')->nullable();
            $table->integer('MinMaxJumlahTerjual')->nullable();
            $table->string('MinMaxBulan')->nullable();
            $table->string('klasifikasi_prediksi')->nullable();
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
        Schema::dropIfExists('knn');
    }
};
