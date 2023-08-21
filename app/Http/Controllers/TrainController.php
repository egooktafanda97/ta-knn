<?php

namespace App\Http\Controllers;

use App\Imports\DataImport;
use App\Models\Data;
use App\Models\DataTest;
use App\Models\DataTrain;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\knn;
use App\Models\Predik;
use App\Models\Preprocessing;
use App\Models\TrainClasification as TrainClasificationModel;

class TrainController extends Controller
{
    public function useTrainModel(): Response
    {
        $data = [
            "get" => Data::all(),
            "dTrain" => Preprocessing::where("JenisData", "train")->get(),
            "dTest" => Preprocessing::where("JenisData", "test")->get(),
            "knn" => TrainClasificationModel::all()
        ];

        return Inertia::render('Train/train', $data);
    }
    public function setups()
    {
        \DB::table("preprocessing")->truncate();
        \DB::table("knn_trains")->truncate();
        return response()->json(true);
    }
    public function importData(Request $request)
    {
        $process = new Process(
            ["python", "C:/Tempur/TA2023/algortmKnnLar/py/setup.py"],
            null,
            ['SYSTEMROOT' => getenv('SYSTEMROOT'), 'PATH' => getenv("PATH")]
        );
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }
        $out = $process->getOutput();
        return response()->json(json_decode($out, true));
        // if ($request->hasFile('file')) {
        // Excel::import(new DataImport, $request->file('file'));
        // }
    }
    public function preprocessingCLuster()
    {
        $process = new Process(
            ['python', 'C:/Tempur/TA2023/algortmKnnLar/py/proccessing.py'],
            null,
            ['SYSTEMROOT' => getenv('SYSTEMROOT'), 'PATH' => getenv("PATH")]
        );
        $process->run();

        // executes after the command finishes
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }
        // \DB::table("data_train")->truncate();
        // \DB::table("data_test")->truncate();
        $out = $process->getOutput();
        $response = json_decode($out, true);
        $responseX = collect($response["x"])->toArray();
        $newX = [];
        foreach ($responseX as $v) {
            $v["JenisData"] = "train";
            array_push($newX, $v);
        }
        $responseX = collect($response["y"])->toArray();
        $newY = [];
        foreach ($responseX as $v) {
            $v["JenisData"] = "test";
            array_push($newY, $v);
        }
        $newPreprocessing =  array_merge($newX, $newY);
        \DB::table("preprocessing")->truncate();
        $r = Preprocessing::insert($newPreprocessing);
        return  response()->json($newPreprocessing);
    }
    public function preprocessingSplitData()
    {
        $process = new Process(
            ['python', 'C:/Tempur/TA2023/algortmKnnLar/py/splitDataset.py'],
            null,
            ['SYSTEMROOT' => getenv('SYSTEMROOT'), 'PATH' => getenv("PATH")]
        );
        $process->run();

        // executes after the command finishes
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }
        $out = $process->getOutput();
        return response()->json(json_decode($out, true));
    }
    public function preprocessingMinMax()
    {
        $process = new Process(
            ['python', 'C:/Tempur/TA2023/algortmKnnLar/py/minmaxoptimation.py'],
            null,
            ['SYSTEMROOT' => getenv('SYSTEMROOT'), 'PATH' => getenv("PATH")]
        );
        $process->run();

        // executes after the command finishes
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }
        $out = $process->getOutput();
        return response()->json(json_decode($out, true));
    }
    public function train()
    {
        $process = new Process(
            ['python', 'C:/Tempur/TA2023/algortmKnnLar/py/knn.py'],
            null,
            ['SYSTEMROOT' => getenv('SYSTEMROOT'), 'PATH' => getenv("PATH")]
        );
        $process->run();

        // executes after the command finishes
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }
        $out = $process->getOutput();
        $dataPredic = collect(json_decode($out, true)["predictions"])->toArray();
        $res_data = collect(json_decode($out, true))->toArray();
        \DB::table("knn_trains")->truncate();
        TrainClasificationModel::insert($dataPredic);
        return response()->json($res_data);
    }
    public function predik(Request $request)
    {
        $dReq = $request->all();
        $data = [
            "nama_barang" => (string) $dReq["nama_barang"],
            "harga" => (int)$dReq["harga"],
            "jumlah_terjual" => (int)$dReq["jumlah_terjual"],
            "bulan" => (int) $dReq["bulan"]
        ];
        $inJosn = json_encode($data);
        $process = new Process(
            ['python', 'C:/Tempur/TA2023/algortmKnnLar/py/predik.py',  $inJosn],
            null,
            ['SYSTEMROOT' => getenv('SYSTEMROOT'), 'PATH' => getenv("PATH")]
        );

        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        $out = $process->getOutput();

        $dataPredic = collect(json_decode($out, true))->toArray();
        $res_data = collect(json_decode($out, true))->toArray();
        Predik::create($res_data);

        return response()->json(json_decode($out, true));
    }
    public function destroy($id)
    {
        $pred = Predik::find($id);
        $pred->delete();
        return response()->json($pred);
    }
    public function test()
    {
        $data = [
            "harga" => 1000000, "jumlah_terjual" => 100, "bulan" => 2
        ];

        // Konversi data menjadi format JSON
        $jsonData = json_encode($data);
        $process = new Process(
            ['python', 'C:/Tempur/TA2023/algortmKnnLar/py/test.py', $jsonData],
            null,
            ['SYSTEMROOT' => getenv('SYSTEMROOT'), 'PATH' => getenv("PATH")]
        );
        $process->run();

        // executes after the command finishes
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }
        $out = $process->getOutput();

        return $out;
    }
}
