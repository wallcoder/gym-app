<script setup >
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import AdminGymPopups from '@/components/AdminGymPopups.vue'
import { useGymStore } from '@/stores/gyms'
import { useAdminStore } from '@/stores/admin'
const admin = useAdminStore();
const { isOpen } = storeToRefs(admin)
const { closeModals, activateGymDetails } = admin
const gymStore = useGymStore()
const { getAllGyms } = gymStore;
const { allGyms, gymSearch, totalPages, currentPage } = storeToRefs(gymStore)

getAllGyms()

watch(gymSearch, (newVal) => {
    getAllGyms(newVal)
})
</script>

<template>
    <section class="flex flex-col">
        <AdminGymPopups />
        <div
            class="p-5 bg-gray-100 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h1 class="text-xl mb-2">Gyms</h1>
            <div class="flex justify-between">
                <div>
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" name="" id="" class="bg-transparent p-2 outline-none" placeholder="Search Gyms"
                        v-model="gymSearch" />
                </div>
                <span>
                    <span></span>


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
                        <tr class="" v-for="gym in allGyms" :key="gym.id">
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                <a href="#" class="font-bold text-blue-500 hover:underline">{{ gym.id }}</a>
                            </td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                {{ gym.gymName }}
                            </td>

                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ gym.gymEmail }}</td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ gym.gymPhone }}</td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                <span
                                    class="p-1.5 text-xs font-medium uppercase tracking-wider text-grey  rounded-lg bg-opacity-50"
                                    :class="gym.status == 'unverified' ? 'bg-orange-600' : 'bg-green-400'">{{ gym.status
                                    }}</span>
                            </td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ gym.User.firstName }} {{
                                gym.User.lastName }}</td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap"><i
                                    @click="activateGymDetails(gym, gym.ownerId)"
                                    class="fa-solid fa-circle-info text-lg cursor-pointer"></i></td>
                            <!-- <td class="p-3 text-sm text-gray-700 whitespace-nowrap"><i class="fa-solid fa-circle-info text-lg"></i></td> -->
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap"><i
                                    class="fa-solid fa-delete-left text-lg cursor-pointer"></i></td>
                        </tr>


                    </tbody>
                </table>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-2">
                <div class=" space-y-3 p-4 rounded-lg shadow" v-for="gym in allGyms" :key="gym.id">
                    <div class="flex items-center space-x-2 text-sm">
                        <div>
                            <a href="#" class="text-blue-500 font-bold hover:underline">{{ gym.id }}</a>
                        </div>
                        <div class="text-gray-500">{{ gym.gymName }}</div>
                        <div>
                            <span
                                class="p-1.5 text-xs font-medium uppercase tracking-wider text-grey  rounded-lg bg-opacity-50"
                                :class="gym.status == 'unverified' ? 'bg-orange-500' : 'bg-green-200'">{{ gym.status
                                }}</span>
                        </div>
                    </div>
                    <div class="text-sm text-gray-700">
                        {{ gym.gymEmail }}
                    </div>
                    <div class="flex justify-between">
                        <div class="text-sm font-medium text-gray-700">
                            {{ gym.gymPhone }}
                        </div>
                        <div class="text-sm font-medium text-gray-700 flex items-center space-x-3">
                            <i class="fa-solid fa-circle-info text-lg cursor-pointer"></i>
                            <i class="fa-solid fa-delete-left text-lg cursor-pointer"></i>

                        </div>
                    </div>

                </div>


            </div>
            <div class="flex justify-center">

                <nav aria-label="Page navigation example" class="my-2">
                    <ul class="flex items-center -space-x-px h-8 text-sm">
                        <li>
                            <button :disabled="currentPage === 1"
                                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
                                @click="getAllGyms('', currentPage - 1, 10, true)">
                                <span class="sr-only">Next</span>
                                <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M5 1 1 5l4 4" />
                                </svg>
                            </button>

                        </li>
                        <li v-for="page in totalPages" @click="getAllGyms('', page, 10, true)" :key="page">
                            <a href="#"
                                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                                :class="currentPage == page ? 'bg-gray-200' : 'bg-white'">{{
                                    page }} </a>
                        </li>

                        <li>

                            <button :disabled="currentPage === totalPages"
                                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
                                @click="getAllGyms('', currentPage + 1, 10, true)">
                                <span class="sr-only">Next</span>
                                <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                            </button>

                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section></template>
