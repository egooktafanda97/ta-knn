import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard(props) {
    const { dataset, dTrain, dTest } = props;
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4">
                    <div class="pl-1 w-full h-[100px] bg-green-400 rounded-lg shadow-md">
                        <div class="flex w-full h-full py-2 px-4 bg-gray-900 text-white rounded-lg justify-between">
                            <div class="my-auto">
                                <p class="font-bold">Jumlah Dataset</p>
                                <p class="text-lg">{dataset}</p>
                            </div>
                            <div class="my-auto">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-4">
                    <div class="pl-1 w-full h-[100px] bg-green-400 rounded-lg shadow-md">
                        <div class="flex w-full h-full py-2 px-4 bg-gray-900 text-white rounded-lg justify-between">
                            <div class="my-auto">
                                <p class="font-bold">Jumlah Data Train</p>
                                <p class="text-lg">{dTrain}</p>
                            </div>
                            <div class="my-auto">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-4">
                    <div class="pl-1 w-full h-[100px] bg-green-400 rounded-lg shadow-md">
                        <div class="flex w-full h-full py-2 px-4 bg-gray-900 text-white rounded-lg justify-between">
                            <div class="my-auto">
                                <p class="font-bold">Jumlah Data Test</p>
                                <p class="text-lg">{dTest}</p>
                            </div>
                            <div class="my-auto">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="bg-indigo-300">
                <img
                    className="object-cover h-48 w-full"
                    src="https://oncard.id/assets/png/image_welcome_oncard.webp"
                />
            </div>
        </AuthenticatedLayout>
    );
}
