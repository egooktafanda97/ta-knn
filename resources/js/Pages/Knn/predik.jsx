import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Model from "../../Components/Modal";
import Modal from "../../Components/Modal";
import axios from "axios";
import $ from "jquery";
import moment from "moment";

export default function predik(props) {
    const { prediksi } = props;
    const [visibles, setVisibles] = useState(false);
    const hendelPredik = async (ev) => {
        setVisibles(true);
        const formData = {
            nama_barang: $("[name='nama_barang']").val(),
            harga: $("[name='harga']").val(),
            jumlah_terjual: $("[name='jumlah_terjual']").val(),
            bulan: $("[name='bulan']").val(),
        };

        const XI = await axios.post("/api/predik", formData).catch((error) => {
            setVisibles(false);
            console.log(error);
        });
        if (XI) {
            setVisibles(false);
            window.location.reload();
        }
    };
    const hndelDestory = async (id) => {
        const up = await axios.delete(`/api/predik/${id}`).catch((err) => {
            console.log(err);
        });
        if (up) {
            window.location.reload();
        }
    };
    return (
        <>
            <AuthenticatedLayout
                auth={props.auth}
                errors={props.errors}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Train Data
                    </h2>
                }
            >
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
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-4">
                        <div className="card shadow-sm mb-3">
                            <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Nama Barang
                                    </label>
                                    <input
                                        type="text"
                                        name="nama_barang"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Kuantitas Produk
                                    </label>
                                    <input
                                        type="number"
                                        name="harga"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Jumlah Terjual
                                    </label>
                                    <input
                                        type="number"
                                        name="jumlah_terjual"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Tahun
                                    </label>
                                    <select
                                        id="bulan"
                                        name="bulan"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="1">2024</option>
                                        <option value="1">2023</option>
                                        <option value="2">2022</option>
                                        <option value="2">2021</option>
                                        <option value="2">2020</option>
                                    </select>
                                </div>
                                <div className="mb-6">
                                    <button
                                        type="button"
                                        onClick={hendelPredik}
                                        class="text-white w-full bg-gray-200 hover:bg-gray-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    >
                                        Mulai Prediksi Laris / Tidak Laris
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-8">
                        <div className="card shadow-sm mb-3">
                            <div className="w-full flex justify-between">
                                <h3>Hasil Prediksi</h3>
                                <a
                                    href="/laporan"
                                    target="_blank"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    Laporan
                                </a>
                            </div>
                            <hr />
                            <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div style={{ overflowX: "scroll" }}>
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Tanggal
                                                </th>
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
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    MinMax Kuantitas Produk
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    MinMax Jumlah Terjual
                                                </th>
                                                {/* <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    MinMax Bulan
                                                </th> */}
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Klasifikasi Prediksi
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    #
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {prediksi.map((x, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {moment(
                                                            x?.create_at
                                                        ).format("DD MM YYYY")}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {x.nama_barang}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {x.harga}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {x.jumlah_terjual}
                                                    </td>
                                                    {/* <td className="px-6 py-4">
                                                        {x.bulan}
                                                    </td> */}
                                                    <td className="px-6 py-4">
                                                        {x.MinMaxharga}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {x.MinMaxJumlahTerjual}
                                                    </td>
                                                    {/* <td className="px-6 py-4">
                                                        {x.MinMaxBulan}
                                                    </td> */}
                                                    <td className="px-6 py-4">
                                                        {x.prediksi}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            onClick={() =>
                                                                hndelDestory(
                                                                    x?.id
                                                                )
                                                            }
                                                            className="middle none center rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                            data-ripple-light="true"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Head title="Dashboard" />
            </AuthenticatedLayout>
        </>
    );
}
