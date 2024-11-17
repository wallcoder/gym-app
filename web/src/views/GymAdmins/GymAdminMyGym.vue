<script setup>
import Button from '@/components/Button.vue'
import { storeToRefs } from 'pinia'
import { useGymAdminStore } from '@/stores/gymAdmin'
import GymAdminMyGymPopups from '@/components/GymAdminMyGymPopups.vue'

const gymAdmin = useGymAdminStore()
const { myGym, phone, email, isOpenGallery, gymIdRef } = storeToRefs(gymAdmin)
const {changePp, changeGymInfo} = gymAdmin
const api = import.meta.env.VITE_API
</script>
<template>
    <div class="flex flex-col gap-5.5 p-6.5">
        <h1 class="text-xl mb-2">My Gym</h1>
        <GymAdminMyGymPopups />

        <form class="flex flex-col">
            <img :src="`${api}${myGym.profileImage}`" alt="gym-pp" class="w-full h-[50vh] object-cover">

            <span class="flex justify-end space-x-2">
                <Button content="Gallery" :handler="() => { isOpenGallery = true }"
                    extraStyle="bg-[#3C50E0] hover:bg-[#3C50E0] hover:brightness-150" />
                <input type="file" class="hidden" name="" id="pp" @change="changePp($event, gymIdRef)">
                <label for="pp"
                    class="bg-[#3C50E0] cursor-pointer p-2 font-semibold rounded-3xl my-2 px-8 transition-all duration-200 ease-linear hover:brightness-150 text-white py-2">Change
                    Profile Pic</label>
            </span>
        </form>
        <form action="">
            <div>


                <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                    Gym Name
                </label>
                <input type="text" placeholder="Disabled label" disabled :value="myGym.gymName"
                    class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black" />
            </div>
            <div>


                <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                    Location
                </label>
                <input type="text" placeholder="Disabled label" disabled
                    :value="`${myGym.GymLocation.buildingNo}, ${myGym.GymLocation.area}, ${myGym.GymLocation.city}`"
                    class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black" />
            </div>

            <div>
                <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                    Phone
                </label>
                <input type="text" placeholder="Default Input" v-model="phone"
                    class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
            </div>
            <div>
                <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email
                </label>
                <input type="text" placeholder="Default Input" v-model="email"
                    class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
            </div>
            <div class="w-full flex justify-end">
                <Button content="Save" :handler="()=>{changeGymInfo(gymIdRef)}" extraStyle="bg-[#3C50E0] hover:bg-[#3C50E0] hover:brightness-150 " />
            </div>
        </form>




    </div>
</template>