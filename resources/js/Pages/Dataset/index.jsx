import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Model from "../../Components/Modal";
import Modal from "../../Components/Modal";
import axios from "axios";

export default function train(props) {
    const [mInp, setmInp] = useState(false);
    const [mUpd, setmUpd] = useState(false);
    const [id, setId] = useState();
    const { get } = props;
    const { data, setData, destroy, errors, post, put, patch } = useForm({
        title: "",
        description: "",
    });

    const [formData, setFormData] = useState({
        nama_barang: "",
        harga: "",
        jumlah_terjual: "",
        bulan: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        setmInp(!mInp);
        post(route("dataset.store", formData));
    }

    async function handleSubmitUpdate(e) {
        e.preventDefault();
        setmUpd(!mInp);

        const up = await axios
            .post(`/data-udpate/update/${id}`, formData)
            .catch((err) => {
                console.log(err);
            });
        if (up) {
            window.location.reload();
        }
    }
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // Kirim data ke backend menggunakan Axios
    //     axios
    //         .post("/api/insert-dataset", formData)
    //         .then((response) => {
    //             // Berhasil menyimpan data, lakukan sesuatu (misalnya tampilkan pesan sukses)
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             // Tangani jika ada error, misalnya validasi gagal
    //             console.error(error.response.data);
    //         });
    // };
    const inpData = () => {
        const Obj = {
            nama_barang: "",
            harga: "",
            jumlah_terjual: "",
            bulan: "",
        };
        setFormData((prevData) => ({
            ...prevData,
            ...Obj,
        }));
    };
    const hndelUpdate = (data) => {
        setId(data.id);
        setmUpd(!mUpd);
        const Obj = {
            nama_barang: data?.nama_barang ?? "",
            harga: data?.harga ?? "",
            jumlah_terjual: data?.jumlah_terjual ?? "",
            bulan: data?.bulan ?? "",
        };
        setFormData((prevData) => ({
            ...prevData,
            ...Obj,
        }));
    };
    const hndelDestory = async (id) => {
        const up = await axios
            .delete(`/data-dalate/${id}`, formData)
            .catch((err) => {
                console.log(err);
            });
        if (up) {
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
            <div className="card shadow-sm mb-3">
                <div className="w-full flex justify-between">
                    <h3>DATASET</h3>
                    <button
                        onClick={() => {
                            inpData();
                            setmInp(!mInp);
                        }}
                        className="middle none center rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                    >
                        Tambah Data
                    </button>
                </div>
            </div>
            <Modal show={mInp}>
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Input Dataset
                            </h3>
                            <button
                                type="button"
                                onClick={() => setmInp(!mInp)}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="defaultModal"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label
                                        htmlFor="nama_barang"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Nama Barang
                                    </label>
                                    <input
                                        type="text"
                                        name="nama_barang"
                                        id="nama_barang"
                                        value={formData.nama_barang}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label
                                        htmlFor="harga"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Harga
                                    </label>
                                    <input
                                        type="number"
                                        name="harga"
                                        id="harga"
                                        value={formData.harga}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label
                                        htmlFor="jumlah_terjual"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Jumlah Terjual
                                    </label>
                                    <input
                                        type="number"
                                        name="jumlah_terjual"
                                        id="jumlah_terjual"
                                        value={formData.jumlah_terjual}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label
                                        htmlFor="bulan"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Bulan
                                    </label>
                                    <input
                                        type="number"
                                        name="bulan"
                                        id="bulan"
                                        value={formData.bulan}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal show={mUpd}>
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Update Dataset
                            </h3>
                            <button
                                type="button"
                                onClick={() => setmUpd(!mUpd)}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="defaultModal"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <form onSubmit={handleSubmitUpdate}>
                                <div className="mb-6">
                                    <label
                                        htmlFor="nama_barang"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Nama Barang
                                    </label>
                                    <input
                                        type="text"
                                        name="nama_barang"
                                        id="nama_barang"
                                        value={formData.nama_barang}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label
                                        htmlFor="harga"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Harga
                                    </label>
                                    <input
                                        type="number"
                                        name="harga"
                                        id="harga"
                                        value={formData.harga}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label
                                        htmlFor="jumlah_terjual"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Jumlah Terjual
                                    </label>
                                    <input
                                        type="number"
                                        name="jumlah_terjual"
                                        id="jumlah_terjual"
                                        value={formData.jumlah_terjual}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label
                                        htmlFor="bulan"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Bulan
                                    </label>
                                    <input
                                        type="number"
                                        name="bulan"
                                        id="bulan"
                                        value={formData.bulan}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nama Barang
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Harga
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Jumlah Terjual
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Bulan
                            </th>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
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
                                <td className="px-6 py-4"> {x?.harga ?? ""}</td>
                                <td className="px-6 py-4">
                                    {" "}
                                    {x?.jumlah_terjual ?? ""}
                                </td>
                                <td className="px-6 py-4">{x?.bulan ?? ""}</td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-evenly">
                                        <button
                                            onClick={() => hndelUpdate(x)}
                                            className="middle none center rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            data-ripple-light="true"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => hndelDestory(x?.id)}
                                            className="middle none center rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            data-ripple-light="true"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
