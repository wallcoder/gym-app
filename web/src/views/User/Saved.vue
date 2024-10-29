<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import ButtonLink from '@/components/ButtonLink.vue'
import GymCard from '@/components/GymCard.vue'
import { storeToRefs } from 'pinia'
import { useGymStore } from '@/stores/gyms'
import LoaderSquare from '@/components/LoaderSquare.vue'
import { useLoaderStore } from '@/stores/loader'
const loader = useLoaderStore()
const { isLoadingSquare } = storeToRefs(loader)


const gymStore = useGymStore();
const { gyms } = storeToRefs(gymStore)
const { getGyms } = gymStore;

onMounted(async () => {
    await getGyms();

})

</script>   

<template>
    <section class=" p-2 flex flex-col w-full rounded-lg">
        <h1 class="text-lg font-semibold text-black">Saved</h1>
        
            <LoaderSquare v-if="isLoadingSquare"/>
       
        <div class=" flex flex-wrap " v-else>


            <GymCard :gyms="gyms" v-motion-fade-visible-once />



        </div>

    </section>
</template>

<style scoped></style>
