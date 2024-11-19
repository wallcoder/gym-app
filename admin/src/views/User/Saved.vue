<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import ButtonLink from '@/components/ButtonLink.vue'
import GymCard from '@/components/GymCard.vue'
import { storeToRefs } from 'pinia'
import { useGymStore } from '@/stores/gyms'
import LoaderSquare from '@/components/LoaderSquare.vue'
import { useLoaderStore } from '@/stores/loader'
import { useHomeStore } from '@/stores/home'

const home = useHomeStore();
const { currentUser } = storeToRefs(home)
const loader = useLoaderStore()
const { isLoadingSquare } = storeToRefs(loader)


const gymStore = useGymStore();
const { userSavedGyms } = storeToRefs(gymStore)
const { getSavedGyms } = gymStore;


onMounted(async () => {
    if (currentUser.value) {
        await getSavedGyms(currentUser.value.userId);
    }

})

</script>   

<template>
    <section class=" p-2 flex flex-col w-full rounded-lg">
        <h1 class="text-lg font-semibold text-black">Saved</h1>

        <LoaderSquare v-if="isLoadingSquare" />

        <div class=" flex flex-wrap w-full" v-else>

            <div class="w-[60vw] h-[35vh] flex justify-center items-center font-semibold text-sixth text-3xl " v-if="userSavedGyms.length === 0">No Saved Gyms</div>
            <GymCard :gyms="userSavedGyms" v-motion-fade-visible-once />
            


        </div>

    </section>
</template>

<style scoped></style>
