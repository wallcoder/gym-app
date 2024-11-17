<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import ButtonLink from './ButtonLink.vue'
import GymCard from '@/components/GymCard.vue'
import LoaderSquare from '@/components/LoaderSquare.vue'
import { storeToRefs } from 'pinia'
import { useGymStore } from '../stores/gyms'
import { useHomeStore } from '@/stores/home'

import { useSearchBarStore } from '@/stores/searchBar'
const searchBar = useSearchBarStore()
const { location } = storeToRefs(searchBar)

import { useLoaderStore } from '@/stores/loader'
const loader = useLoaderStore()

const { isLoadingSquare } = storeToRefs(loader)

const home = useHomeStore()
const { getSaved } = home
const { savedGyms, currentUser } = storeToRefs(home)

const gymStore = useGymStore();
const { gyms, allGyms } = storeToRefs(gymStore)
const { getGyms, getAllGyms } = gymStore;


onMounted(async () => {
    // console.log("LOCATION: ", location.value)
    console.log("LOCATION: ", location.value)
    
    getGyms(1, 3, location.value);
    if (currentUser.value) {
        console.log(currentUser.value.userId)
        await getSaved(currentUser.value.userId)
    }


})


</script>   

<template>
    <section class=" py-10 w-full font-semibold flex flex-col items-center tablet:px-[12%]  ">
        <h1 class="text-2xl tablet:text-3xl text-black text-center">Top Gyms Available in <span class="text-first">{{
            location }}</span></h1>
        <div class="w-full flex flex-wrap justify-center   gym-card mt-8 ">
            <div v-if="isLoadingSquare">
                <LoaderSquare />
            </div>
            <div v-else>
                <div v-if="gyms.length == 0" class="capitalize text-2xl p-4">no gym available in this area</div>
                <GymCard :gyms="gyms" />
            </div>


        </div>
        <ButtonLink content="View All" link="gyms/location/Aizawl" v-if="gyms.length !== 0" />
    </section>
</template>

<style scoped></style>
