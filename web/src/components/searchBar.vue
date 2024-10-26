
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useSearchBarStore } from '@/stores/searchBar'
const searchBar = useSearchBarStore()
const { toggleLoc, toggleSugg } = searchBar
const { isOpenLoc, isOpenSugg, query } = storeToRefs(searchBar)
</script>

<template>
    <div class="relative shadow-3 rounded-lg z-99999" v-motion-fade-visible-once>
        <div class="bg-white h-10 tablet:w-[600px]  laptop:h-10 smartphone:w-[400px] rounded-lg  mb-1 flex">
            <span class="flex justify-center items-center cursor-pointer"><i
                    class="fa-solid fa-magnifying-glass text-lg text-first p-2"></i></span>
            <input v-model="query" type="text" placeholder="Search Gym" class="text-black p-2 rounded-lg w-[80%] outline-none ">
            <span class="flex  items-center justify-end rounded-lg  text-black  p-2 w-[20%] cursor-pointer" @click="toggleLoc()">Aizawl<span
                    class=""></span><i class="fa-solid fa-location-dot text-lg text-first p-2 cursor-pointer"></i>
                <i class="fa-solid text-sm px-1 fa-chevron-down transition-all duration-100 ease-in-out cursor-pointer"
                    :class="isOpenLoc ? 'rotate-180' : ''" ></i></span>
        </div>
        <div v-if="isOpenSugg"
            class="w-40 tablet:w-[600px] absolute  z-10 smartphone:w-[400px] text-black  flex rounded-lg max-h-80 bg-white">
            <div class="w-[100%]  rounded-l-lg  flex flex-col overflow-y-auto">
                <div class="flex bg-white hover:bg-gray cursor-pointer p-2 rounded-lg">
                    <img src="../assets/images/wallpaper2.jpg" alt="gym"
                        class="w-18 h-18 rounded-lg bg-slate-300 object-cover">
                    <div class="flex flex-col ml-2">
                        <h3 class="font-semibold bg-">Lotus Gym</h3>
                        <h4>Lonely Road, Aizawl</h4>
                        <h4 class="bg-first text-white text-sm rounded w-[25%] text-center">4.2</h4>
                    </div>


                </div>




            </div>



        </div>
        <div v-if="isOpenLoc"
            class="w-40 tablet:w-[600px] absolute   z-10 smartphone:w-[400px] text-black justify-end flex rounded-lg max-h-80 ">
            <div class="w-[40%]  rounded-l-lg  flex flex-col overflow-y-auto">
                <div class="flex flex-col bg-white  cursor-pointer rounded-lg">

                    <div class="flex flex-col  p-2 hover:bg-gray rounded-lg">
                        <h3 class=" space-x-1"><i class="fa-solid fa-location-crosshairs"></i><span>Detect
                                Current Location</span></h3>

                    </div>
                    <div class="flex flex-col  p-2 hover:bg-gray rounded-lg">
                        <h3 class=" space-x-1"><i class="fa-solid fa-plus"></i><span>Add Location</span></h3>

                    </div>



                </div>




            </div>



        </div>

    </div>
</template>