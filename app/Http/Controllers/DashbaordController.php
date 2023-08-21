<?php

namespace App\Http\Controllers;

use App\Imports\DataImport;
use App\Models\Data;
use App\Models\DataTest;
use App\Models\DataTrain;
use App\Models\Preprocessing;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;

class DashbaordController extends Controller
{
    public function index()
    {
        $data = [
            "dataset" => Data::orderBy("id", "DESC")->count(),
            "dTrain" => Preprocessing::orderBy("id", "DESC")->where("JenisData", "train")->count(),
            "dTest" => Preprocessing::orderBy("id", "DESC")->where("JenisData", "test")->count(),
        ];
        return Inertia::render('Dashboard', $data);
    }
}
