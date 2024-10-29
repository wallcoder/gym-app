<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useGymStore } from '@/stores/gyms'
import { useSearchBarStore } from '@/stores/searchBar'

const gymStore = useGymStore()
const { searchGyms } = gymStore
const { searchedGyms } = storeToRefs(gymStore)
const api = import.meta.env.VITE_API
const searchBar = useSearchBarStore()
const { toggleLoc, toggleSugg } = searchBar
const { isOpenLoc, isOpenSugg, query, hasSearched } = storeToRefs(searchBar)
const location = ref("Aizawl")

watch(query, (newQuery) => {
    hasSearched.value = true

    if (newQuery == '') {
        hasSearched.value = false
    } else {
        isOpenSugg.value = true
    }
    searchGyms(newQuery, location.value)
})

// Method to detect current location
const detectCurrentLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                
                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.address) {
                            
                            const city = data.address.city || data.address.town || data.address.village || 'Your location';
                            location.value = city; 
                            
                            
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching location:', error);
                    });
            },
            (error) => {
                console.error('Error detecting location:', error.message);
            }
        );
        isOpenLoc.value = false
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}
</script>

<template>
    <div class="relative shadow-3 rounded-lg z-99999" v-motion-fade-visible-once>
        <div class="bg-white h-10 tablet:w-[600px] laptop:h-10 smartphone:w-[400px] rounded-lg mb-1 flex">
            <span class="flex justify-center items-center cursor-pointer"><i
                    class="fa-solid fa-magnifying-glass text-lg text-first p-2"></i></span>
            <input v-model="query" type="text" placeholder="Search Gym" @click="isOpenSugg = true"
                class="text-black p-2 rounded-lg w-[80%] outline-none">
            <span class="flex items-center justify-end rounded-lg text-black p-2 w-[20%] cursor-pointer"
                @click="toggleLoc()">
                {{ location }}<span class=""></span><i class="fa-solid fa-location-dot text-lg text-first p-2 cursor-pointer"></i>
                <i class="fa-solid text-sm px-1 fa-chevron-down transition-all duration-100 ease-in-out cursor-pointer"
                    :class="isOpenLoc ? 'rotate-180' : ''"></i>
            </span>
        </div>
        <div v-if="isOpenSugg" v-motion-fade-visible-once
            class="w-40 tablet:w-[600px] absolute z-10 smartphone:w-[400px] text-black flex rounded-lg max-h-80 bg-white shadow-4">
            <div class="w-[100%] rounded-l-lg flex flex-col overflow-y-auto">
                <div v-if="searchedGyms.length === 0 && hasSearched" class="h-10 flex justify-center items-center ">
                    No Search Result
                </div>
                <RouterLink @click="isOpenSugg = false" :to="`/gyms/gym/${e.id}`" v-motion-fade-visible-once v-else
                    class="flex bg-white hover:bg-gray cursor-pointer p-2 rounded-lg" v-for="e in searchedGyms" :key="e.id">
                    <img :src="`${api}${e.profileImage}`" alt="gym" class="w-18 h-18 rounded-lg bg-slate-300 object-cover">
                    <div class="flex flex-col ml-2">
                        <h3 class="font-semibold bg-">{{ e.gymName }}</h3>
                        <h4>Lonely Road, Aizawl</h4>
                        <h4 class="bg-first text-white text-sm rounded w-[25%] text-center">4.2</h4>
                    </div>
                </RouterLink>
            </div>
        </div>
        <div v-if="isOpenLoc"
            class="w-40 tablet:w-[600px] absolute z-10 smartphone:w-[400px] text-black justify-end flex rounded-lg max-h-80 ">
            <div class="w-[40%] rounded-l-lg flex flex-col overflow-y-auto">
                <div class="flex flex-col bg-white cursor-pointer rounded-lg">
                    <div class="flex flex-col p-2 hover:bg-gray rounded-lg" @click="detectCurrentLocation">
                        <h3 class="space-x-1"><i class="fa-solid fa-location-crosshairs"></i><span>Detect Current
                                Location</span></h3>
                    </div>
                    <div class="flex flex-col p-2 hover:bg-gray rounded-lg">
                        <h3 class="space-x-1"><i class="fa-solid fa-plus"></i><span>Add Location</span></h3>
                    </div>
                </div>
        </div>
    </div>
</div></template>

<style scoped></style>
