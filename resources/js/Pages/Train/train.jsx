import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PreprocessingTabs, DTables } from "./DefaultTabs";
import axios from "axios";

export default function train(props) {
    const { get, dTrain, dTest, knn } = props;
    const [visibles, setVisibles] = useState(false);
    const [acc, setAcc] = useState(0);
    const hndelProcessing = async () => {
        setVisibles(true);
        const XI = await axios.get("/api/proccess").catch((error) => {
            setVisibles(false);
            console.log(error);
        });
        if (XI) {
            setVisibles(false);
            // window.location.reload();
        }
    };

    const hndelTrain = async () => {
        setVisibles(true);
        const XI = await axios.get("/api/train").catch((error) => {
            setVisibles(false);
            console.log(error);
        });
        if (XI) {
            console.log(XI);
            setVisibles(false);
            sessionStorage.setItem("akurasi", `${XI.data.acuracy}`);
            window.location.reload();
        }
    };
    const hndelSetup = async () => {
        setVisibles(true);
        const XI = await axios.get("/api/setup").catch((error) => {
            setVisibles(false);
            console.log(error);
        });
        if (XI) {
            setVisibles(false);
            sessionStorage.removeItem("akurasi", `${XI.data.acuracy}`);
            window.location.reload();
        }
    };
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Train Data
                </h2>
            }
        >
            <Head title="Dashboard" />
            {visibles ? (
                <div
                    style={{
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        position: "fixed",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                        background: "rgba(255,255,255,.4)",
                    }}
                >
                    <div>
                        <div className="arc"></div>
                        <h1>
                            <span>LOADING</span>
                        </h1>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <div class="relative overflow-x-auto">
                <PreprocessingTabs
                    Dataset={
                        <>
                            <button
                                type="button"
                                onClick={hndelSetup}
                                class="text-white w-full bg-gray-200 hover:bg-gray-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Mulai Ulang
                            </button>
                            <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Nama Barang
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Kuantitas Produk
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Jumlah Terjual
                                            </th>
                                            {/* <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Tahun
                                            </th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {get.map((x) => (
                                            <tr className="bg-white dark:bg-gray-800">
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {x?.nama_barang ?? ""}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {x?.harga ?? ""}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {x?.jumlah_terjual ?? ""}
                                                </td>
                                                {/* <td className="px-6 py-4">
                                                    {x?.bulan ?? ""}
                                                </td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    }
                    preprocessing={
                        <>
                            <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <button
                                    type="button"
                                    onClick={hndelProcessing}
                                    class="text-white w-full bg-gray-200 hover:bg-gray-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    Mulai Preproccesing data
                                </button>
                                <hr />
                                <br />
                                <DTables
                                    dTrain={
                                        <>
                                            <div
                                                style={{ overflowX: "scroll" }}
                                            >
                                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3"
                                                            >
                                                                Nama Barang
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3"
                                                            >
                                                                Kuantitas Produk
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3"
                                                            >
                                                                Jumlah Terjual
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3"
                                                            >
                                                                Tahun
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3"
                                                            >
                                                                Rata-Rata
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3"
                                                            >
                                                                Klasifikasi
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3"
                                                            >
                                                                MinMax Kuantitas
                                                                Produk
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3"
                                                            >
                                                                MinMax Jumlah
                                                                Terjual
                                                            </th>
                                                            {/* <th
                                                                scope="col"
                                                                className="px-6 py-3"
                                                            >
                                                                MinMax Tahun
                                                            </th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {dTrain.map(
                                                            (x, index) => (
                                                                <tr key={index}>
                                                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                        {
                                                                            x.nama_barang
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {
                                                                            x.harga
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {
                                                                            x.jumlah_terjual
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {
                                                                            x.bulan
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {
                                                                            x.rata_rata
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {
                                                                            x.klasifikasi
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {
                                                                            x.MinMaxharga
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {
                                                                            x.MinMaxJumlahTerjual
                                                                        }
                                                                    </td>
                                                                    {/* <td className="px-6 py-4">
                                                                        {
                                                                            x.MinMaxBulan
                                                                        }
                                                                    </td> */}
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    }
                                    // dTest={
                                    //     <>
                                    //         <div
                                    //             style={{ overflowX: "scroll" }}
                                    //         >
                                    //             <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    //                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    //                     <tr>
                                    //                         <th
                                    //                             scope="col"
                                    //                             className="px-6 py-3"
                                    //                         >
                                    //                             Nama Barang
                                    //                         </th>
                                    //                         <th
                                    //                             scope="col"
                                    //                             className="px-6 py-3"
                                    //                         >
                                    //                             Harga
                                    //                         </th>
                                    //                         <th
                                    //                             scope="col"
                                    //                             className="px-6 py-3"
                                    //                         >
                                    //                             Jumlah Terjual
                                    //                         </th>
                                    //                         <th
                                    //                             scope="col"
                                    //                             className="px-6 py-3"
                                    //                         >
                                    //                             Bulan
                                    //                         </th>
                                    //                         <th
                                    //                             scope="col"
                                    //                             className="px-6 py-3"
                                    //                         >
                                    //                             Rata-Rata
                                    //                         </th>
                                    //                         <th
                                    //                             scope="col"
                                    //                             className="px-6 py-3"
                                    //                         >
                                    //                             Klasifikasi
                                    //                         </th>
                                    //                         <th
                                    //                             scope="col"
                                    //                             className="px-6 py-3"
                                    //                         >
                                    //                             MinMax Harga
                                    //                         </th>
                                    //                         <th
                                    //                             scope="col"
                                    //                             className="px-6 py-3"
                                    //                         >
                                    //                             MinMax Jumlah
                                    //                             Terjual
                                    //                         </th>
                                    //                         <th
                                    //                             scope="col"
                                    //                             className="px-6 py-3"
                                    //                         >
                                    //                             MinMax Bulan
                                    //                         </th>
                                    //                     </tr>
                                    //                 </thead>
                                    //                 <tbody>
                                    //                     {dTest.map(
                                    //                         (x, index) => (
                                    //                             <tr key={index}>
                                    //                                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    //                                     {
                                    //                                         x.nama_barang
                                    //                                     }
                                    //                                 </td>
                                    //                                 <td className="px-6 py-4">
                                    //                                     {
                                    //                                         x.harga
                                    //                                     }
                                    //                                 </td>
                                    //                                 <td className="px-6 py-4">
                                    //                                     {
                                    //                                         x.jumlah_terjual
                                    //                                     }
                                    //                                 </td>
                                    //                                 <td className="px-6 py-4">
                                    //                                     {
                                    //                                         x.bulan
                                    //                                     }
                                    //                                 </td>
                                    //                                 <td className="px-6 py-4">
                                    //                                     {
                                    //                                         x.rata_rata
                                    //                                     }
                                    //                                 </td>
                                    //                                 <td className="px-6 py-4">
                                    //                                     {
                                    //                                         x.klasifikasi
                                    //                                     }
                                    //                                 </td>
                                    //                                 <td className="px-6 py-4">
                                    //                                     {
                                    //                                         x.MinMaxharga
                                    //                                     }
                                    //                                 </td>
                                    //                                 <td className="px-6 py-4">
                                    //                                     {
                                    //                                         x.MinMaxJumlahTerjual
                                    //                                     }
                                    //                                 </td>
                                    //                                 <td className="px-6 py-4">
                                    //                                     {
                                    //                                         x.MinMaxBulan
                                    //                                     }
                                    //                                 </td>
                                    //                             </tr>
                                    //                         )
                                    //                     )}
                                    //                 </tbody>
                                    //             </table>
                                    //         </div>
                                    //     </>
                                    // }
                                />
                            </div>
                        </>
                    }
                    train={
                        <>
                            {/* <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <button
                                    type="button"
                                    onClick={hndelTrain}
                                    class="text-white w-full bg-gray-200 hover:bg-gray-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    Mulai Train
                                </button>
                                <hr />
                                <br />
                                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        Acuracy{" "}
                                        {sessionStorage.getItem("akurasi") ??
                                            ""}{" "}
                                        %
                                    </h5>
                                </div>
                                <br />
                                <div style={{ overflowX: "scroll" }}>
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Nama Barang
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Harga
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Jumlah Terjual
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Bulan
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Rata-Rata
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Klasifikasi
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    MinMax Harga
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    MinMax Jumlah Terjual
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    MinMax Bulan
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Klasifikasi Prediksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {knn.map((x, index) => (
                                                <tr
                                                    key={index}
                                                    className={
                                                        x?.klasifikasi !=
                                                        x?.klasifikasi_prediksi
                                                            ? "bg-gray-500"
                                                            : ""
                                                    }
                                                >
                                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {x.nama_barang}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {x.harga}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {x.jumlah_terjual}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {x.bulan}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {x.rata_rata}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {x.klasifikasi}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {x.MinMaxharga}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {x.MinMaxJumlahTerjual}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {x.MinMaxBulan}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {x.klasifikasi_prediksi}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div> */}
                        </>
                    }
                />
                {/* <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Nama Barang
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Harga
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Jumlah Terjual
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Bulan
                            </th>
                            <th scope="col" class="px-6 py-3">
                                #
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white dark:bg-gray-800">
                            <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                Magic Mouse 2
                            </th>
                            <td class="px-6 py-4">Black</td>
                            <td class="px-6 py-4">Accessories</td>
                            <td class="px-6 py-4">$99</td>
                            <td class="px-6 py-4">#</td>
                        </tr>
                    </tbody>
                </table> */}
            </div>
        </AuthenticatedLayout>
    );
}
