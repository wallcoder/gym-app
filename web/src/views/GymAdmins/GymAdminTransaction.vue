<script setup>
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useGymAdminStore } from '@/stores/gymAdmin';
import { useUserStore } from '@/stores/users';

const gymAdmin = useGymAdminStore();
const { gymIdRef, transactions } = storeToRefs(gymAdmin);
const { getTransactions } = gymAdmin;

const user = useUserStore();
const { search } = storeToRefs(user);

const loading = ref(true); // Loading state
const error = ref(null); // Error state

onMounted(async () => {
    try {
        loading.value = true; // Start loading
        await getTransactions(gymIdRef.value); // Fetch transactions
    } catch (err) {
        error.value = err.message || 'Failed to load transactions'; // Handle errors
    } finally {
        loading.value = false; // Stop loading
    }
});

watch(search, async (newVal) => {
    try {
        loading.value = true; // Start loading for search
        await getTransactions(newVal); // Fetch filtered transactions
    } catch (err) {
        error.value = err.message || 'Failed to filter transactions';
    } finally {
        loading.value = false; // Stop loading
    }
});
</script>

<template>
    <section class="flex flex-col">
        <div
            class="p-5 h-screen bg-gray-100 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h1 class="text-xl mb-2">Transactions</h1>

            <!-- Search Bar -->
            <div class="flex justify-between">
                <div>
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input v-model="search" type="text" class="bg-transparent p-2 outline-none"
                        placeholder="Search Transactions" />
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-10">
                <p>Loading transactions...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center py-10 text-red-500">
                <p>{{ error }}</p>
            </div>

            <!-- Transactions Table -->
            <div v-else>
                <!-- Desktop View -->
                <div class="overflow-auto rounded-lg shadow hidden md:block">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                                <th class="w-20 p-3 text-sm font-semibold tracking-wide text-left">ID</th>
                                <th class="p-3 w-24 text-sm font-semibold tracking-wide text-left">Ref ID</th>
                                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Type</th>
                                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Method</th>
                                <th class="w-12 p-3 text-sm font-semibold tracking-wide text-left">Amount</th>
                                <th class="w-12 p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                                <th class="p-3 text-sm font-semibold tracking-wide text-left">Status</th>
                                <th class="w-12 p-3 text-sm font-semibold tracking-wide text-left"></th>
                                <th class="w-12 p-3 text-sm font-semibold tracking-wide text-left"></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-for="i in transactions.allItems" :key="i.id">
                                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    <a href="#" class="font-bold text-blue-500 hover:underline">{{ i.id }}</a>
                                </td>
                                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ i.refId }}</td>
                                <td class="p-3 text-sm text-gray-700 whitespace-nowrap capitalize">{{ i.transactionType }}</td>
                                <td class="p-3 text-sm text-gray-700 whitespace-nowrap capitalize">{{ i.transactionMethod }}
                                </td>
                                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ i.amount }}</td>
                                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ i.User.firstName }} {{ i.User.lastName }}</td>
                                <td class="p-3 text-sm text-gray-700 whitespace-nowrap uppercase">
                                    <span class="p-1.5 text-xs font-medium tracking-wider rounded-lg bg-opacity-50"
                                        :class="i.status === 'success' ? 'bg-green-400' : 'bg-orange-600'">
                                        {{ i.status }}
                                    </span>
                                </td>
                                <!-- <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    <i class="fa-solid fa-circle-info text-lg cursor-pointer"></i>
                                </td>
                                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    <i class="fa-solid fa-delete-left text-lg cursor-pointer"></i>
                                </td> -->
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Mobile View -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                    <div v-for="i in transactions.allItems" :key="i.id" class="space-y-3 p-4 rounded-lg shadow">
                        <div class="flex items-center space-x-2 text-sm">
                            <a href="#" class="text-blue-500 font-bold hover:underline">#{{ i.id }}</a>
                            <span class="p-1.5 text-xs font-medium uppercase rounded-lg"
                                :class="i.status === 'success' ? 'bg-green-800' : 'bg-orange-600'">
                                {{ i.status }}
                            </span>
                        </div>
                        <div class="text-sm text-gray-700">
                            <p>Ref ID: {{ i.referenceId }}</p>
                            <p>Type: {{ i.transactionType }}</p>
                            <p>Method: {{ i.transactionMethod }}</p>
                            <p>Amount: {{ i.amount }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
