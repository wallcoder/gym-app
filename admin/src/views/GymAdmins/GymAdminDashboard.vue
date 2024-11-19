<script setup>
import Button from '@/components/Button.vue'
import {ref, onMounted} from 'vue'
import { storeToRefs } from 'pinia'
import { useGymAdminStore } from '@/stores/gymAdmin'
import GymAdminMyGymPopups from '@/components/GymAdminMyGymPopups.vue'

const gymAdmin = useGymAdminStore()
const { gymIdRef, count } = storeToRefs(gymAdmin)
const {countData, formatAmount} = gymAdmin

onMounted(()=>{
    countData(gymIdRef.value)
})
</script>
<template>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        
        <div
            class="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4"><i class="fa-solid fa-money-bill text-white"></i>
            </div>

            <div class="mt-4 flex items-end justify-between">
                <div>
                    <h4 class="text-title-md font-bold text-black dark:text-white">₹{{  formatAmount(count.profits) }}</h4>
                    <span class="text-sm font-medium">Total Profits</span>
                </div>

                <!-- <span class="flex items-center gap-1 text-sm font-medium">
                    sdgsdg
                </span> -->
            </div>
        </div>
        <div
            class="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                <i class="fa-solid fa-money-check-dollar"></i>
            </div>

            <div class="mt-4 flex items-end justify-between">
                <div>
                    <h4 class="text-title-md font-bold text-black dark:text-white">{{  formatAmount(count.membershipPlans) }}</h4>
                    <span class="text-sm font-medium">Total Membership Plans</span>
                </div>

                <!-- <span class="flex items-center gap-1 text-sm font-medium">
                    sdgsdg
                </span> -->
            </div>
        </div>
        <div
            class="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4"><i class="fa-solid fa-users "></i>
            </div>

            <div class="mt-4 flex items-end justify-between">
                <div>
                    <h4 class="text-title-md font-bold text-black dark:text-white">{{  formatAmount(count.activeMembers) }}</h4>
                    <span class="text-sm font-medium">Total Active Members</span>
                </div>
                

                <!-- <span class="flex items-center gap-1 text-sm font-medium">
                    sdgsdg
                </span> -->
            </div>
        </div>
    </div>
</template>