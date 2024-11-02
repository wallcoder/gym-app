<script setup >
import { ref } from 'vue'

</script>

<template>
    <section class="flex flex-col">
        <div
            class="p-5 h-screen bg-gray-100 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h1 class="text-xl mb-2">Membership</h1>
            <div class="flex justify-between">
                <div>
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" name="" id="" class="bg-transparent p-2 outline-none" placeholder="Search Gyms" />
                </div>
                <span>
                    <span></span>
                    <i class="fa-solid fa-plus cursor-pointer text-lg"></i>
                    
                </span>
            </div>

            <div class="overflow-auto rounded-lg shadow hidden md:block">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th class="w-20 p-3 text-sm font-semibold tracking-wide text-left">ID</th>
                            <th class="p-3 w-24 text-sm font-semibold tracking-wide text-left">Name</th>
                            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Email</th>
                            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Phone</th>
                            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Status</th>
                            <th class=" p-3 text-sm font-semibold tracking-wide text-left">Owner</th>

                            <th class="w-12 p-3 text-sm font-semibold tracking-wide text-left"></th>
                            <th class="w-12 p-3 text-sm font-semibold tracking-wide text-left"></th>
                            <th class="w-0 p-3 text-sm font-semibold tracking-wide text-left"></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr class="">
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                <a href="#" class="font-bold text-blue-500 hover:underline">10001</a>
                            </td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                Kring New Fit office chair, mesh + PU, black
                            </td>

                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">16/10/2021</td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">16/10/2021</td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                <span
                                    class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Verified</span>
                            </td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">$200.00</td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap"><i
                                    class="fa-solid fa-circle-info text-lg cursor-pointer"></i></td>
                            <!-- <td class="p-3 text-sm text-gray-700 whitespace-nowrap"><i class="fa-solid fa-circle-info text-lg"></i></td> -->
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap"><i
                                    class="fa-solid fa-delete-left text-lg cursor-pointer"></i></td>
                        </tr>


                    </tbody>
                </table>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                <div class=" space-y-3 p-4 rounded-lg shadow">
                    <div class="flex items-center space-x-2 text-sm">
                        <div>
                            <a href="#" class="text-blue-500 font-bold hover:underline">#1000</a>
                        </div>
                        <div class="text-gray-500">10/10/2021</div>
                        <div>
                            <span
                                class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Delivered</span>
                        </div>
                    </div>
                    <div class="text-sm text-gray-700">
                        Kring New Fit office chair, mesh + PU, black
                    </div>
                    <div class="text-sm font-medium text-black">
                        $200.00
                    </div>
                </div>


            </div>
        </div>
    </section>
</template>
