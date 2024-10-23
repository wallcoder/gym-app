<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import ButtonLink from './ButtonLink.vue'
import GymCard from '@/components/GymCard.vue'
import { storeToRefs } from 'pinia'
import { useGymStore } from '../stores/gyms'


const gymStore = useGymStore();
const { gyms } = storeToRefs(gymStore)
const { getGyms } = gymStore;

onMounted(async () => {
    await getGyms();
    
})

</script>   

<template>
    <section class=" py-10 w-full font-semibold flex flex-col items-center tablet:px-[12%]  ">
        <h1 class="text-2xl tablet:text-3xl text-black text-center">Top Gyms Available in <span
                class="text-first">Aizawl</span></h1>
        <div class="w-full flex flex-wrap justify-center   gym-card mt-8 ">


            <GymCard :gyms="gyms" />


        </div>
        <ButtonLink content="View All" link="gyms/location/Aizawl" />
    </section>
</template>

<style scoped>

</style>
