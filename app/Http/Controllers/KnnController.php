<?php

namespace App\Http\Controllers;

use App\Models\Predik;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

class KnnController extends Controller
{
    public function show()
    {
        $data = [
            "prediksi" => Predik::orderBy("id", "desc")->get()
        ];
        return Inertia::render('Knn/predik', $data);
    }
}
