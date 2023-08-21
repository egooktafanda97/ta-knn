<?php

namespace App\Http\Controllers;


use App\Models\Data;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

class DataController extends Controller
{

    public function index(): Response
    {

        $data = [
            "get" => Data::orderBy("id", "DESC")->get()
        ];

        return Inertia::render('Dataset/index', $data);
    }
    public function store(Request $request)
    {

        $request->validate([
            'nama_barang' => 'required|string|max:255',
            'harga' => 'required|numeric',
            'jumlah_terjual' => 'required|integer',
            'bulan' => 'required|integer',
        ]);

        $data = Data::create($request->all());
        return Redirect::route('dataset.index');
    }

    public function show(Data $data)
    {
        return response()->json(Data::all());
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_barang' => 'sometimes|string|max:255',
            'harga' => 'sometimes|numeric',
            'jumlah_terjual' => 'sometimes|integer',
            'bulan' => 'sometimes|integer',
        ]);
        $data = Data::find($id);
        $data->update($request->all());
    }

    public function destroy($id)
    {
        $data = Data::find($id);
        $data->delete();
        return response()->json($data);
    }
}
