<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import ButtonLink from '@/components/ButtonLink.vue'
import GymCard from '@/components/GymCard.vue'
import { storeToRefs } from 'pinia'
import { useGymStore } from '@/stores/gyms'


const gymStore = useGymStore();
const { gyms } = storeToRefs(gymStore)
const { getGyms } = gymStore;

onMounted(async () => {
    await getGyms();

})

</script>   

<template>
    <section class=" p-2 flex flex-col w-full rounded-lg">
        <h1 class="text-lg font-semibold text-black">My Gyms</h1>
        <div class=" flex flex-wrap ">


            <GymCard :gyms="gyms" />
            

        </div>
        
    </section>
</template>

<style scoped></style>
