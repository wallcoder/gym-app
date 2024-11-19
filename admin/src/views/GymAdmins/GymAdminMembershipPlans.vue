<script setup >
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useGymAdminStore } from '@/stores/gymAdmin'
import { useUserStore } from '@/stores/users'
import Popup from '@/components/GymAdminMembershipPlansPopups.vue'

const gymAdmin = useGymAdminStore()
const { gymIdRef, membershipPlans, isOpenAddPlan } = storeToRefs(gymAdmin)
const { getMemberships, updateMembershipPlan, deleteMembershipPlan } = gymAdmin
const user = useUserStore()

const { allItems, search } = storeToRefs(user)
onMounted(() => {
    getMemberships(gymIdRef.value)

})

watch(search, async (newVal) => {
    await getMemberships(newVal);
})

</script>

<template>
    <section class="flex flex-col">
        <Popup />
        <div
            class="p-5 h-screen bg-gray-100 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h1 class="text-xl mb-2">Membership Plans</h1>
            <div class="flex justify-between">
                <div>
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input v-model="search" type="text" name="" id="" class="bg-transparent p-2 outline-none"
                        placeholder="Search Gyms" />
                </div>
                <span>
                    
                    <i class="fa-solid fa-plus cursor-pointer text-lg" @click="isOpenAddPlan = true"> </i>

                </span>
            </div>

            <div class="overflow-auto rounded-lg shadow hidden md:block">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th class="w-20 p-3 text-sm font-semibold tracking-wide text-left">ID</th>
                            <th class="p-3 w-24 text-sm font-semibold tracking-wide text-left">Title</th>
                            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Description</th>
                            <!-- <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Role</th> -->
                            <!-- <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Status</th> -->
                            <th class="w-12 p-3 text-sm font-semibold tracking-wide text-left">Price(Rs)</th>
                            <th class="w-12 p-3 text-sm font-semibold tracking-wide text-left">Version</th>
                            <th class=" p-3 text-sm font-semibold tracking-wide text-left">Status</th>


                            <th class="w-12 p-3 text-sm font-semibold tracking-wide text-left"></th>
                            <th class="w-12 p-3 text-sm font-semibold tracking-wide text-left"></th>

                            <th class="w-0 p-3 text-sm font-semibold tracking-wide text-left"></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr class="" v-for="i in membershipPlans.allItems" :key="i.id">
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                <a href="#" class="font-bold text-blue-500 hover:underline">{{ i.id }}</a>
                            </td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                <span>{{ i.planName }}</span>
                            </td>

                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap"><span>{{ i.planDescription }}</span></td>

                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap uppercase"><span>{{ i.price }}</span></td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap uppercase"><span v-if="!i.version">null</span><span v-else>{{ i.version }}</span></td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap uppercase" ><span class="p-1.5 text-xs font-medium uppercase tracking-wider text-grey  rounded-lg bg-opacity-50" :class="i.state == 'active' ? 'bg-green-400':'bg-orange-600'  ">{{ i.state }}</span></td>
                            <!-- <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                <span
                                    class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Verified</span>
                            </td> -->
                            <!-- <td class="p-3 text-sm text-gray-700 whitespace-nowrap">$200.00</td> -->
                            <!-- <td class="p-3 text-sm text-gray-700 whitespace-nowrap"><i
                                    class="fa-solid fa-circle-info text-lg cursor-pointer"></i></td> -->
                            <!-- <td class="p-3 text-sm text-gray-700 whitespace-nowrap"><i class="fa-solid fa-circle-info text-lg"></i></td> -->
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap"><i :class="i.state == 'active' ? 'text-green-400':'text-orange-600'" @click="updateMembershipPlan(i.id)"
                                    class="fa-solid fa-circle text-lg cursor-pointer" ></i></td>
                                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap"><i  @click="deleteMembershipPlan(i.id)"
                                        class="fa-solid fa-delete-left text-lg cursor-pointer"></i></td>
                        </tr>


                    </tbody>
                </table>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                <div class=" space-y-3 p-4 rounded-lg shadow" v-for="i in membershipPlans.allItems" :key="i.id">
                    <div class="flex items-center space-x-2 text-sm">
                        <div>
                            <a href="#" class="text-blue-500 font-bold hover:underline">#{{ i.id }}</a>
                        </div>
                        <div class="text-gray-500"></div>
                        <div>
                            <span
                                class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50"></span>
                        </div>
                    </div>
                    <div class="text-sm text-gray-700">

                    </div>
                    <div class="text-sm font-medium text-black">

                    </div>
                </div>


            </div>
        </div>
    </section>
</template>
