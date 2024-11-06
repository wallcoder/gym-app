<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import ButtonLink from '@/components/ButtonLink.vue'
import GymCard from '@/components/GymCard.vue'
import MyGym from '@/components/MyGym.vue'
import { storeToRefs } from 'pinia'
import { useGymStore } from '@/stores/gyms'
import { useHomeStore } from '@/stores/home'
const home = useHomeStore()
const { currentUser } = storeToRefs(home)

const gymStore = useGymStore();
const { myGyms } = storeToRefs(gymStore)
const { getMyGyms } = gymStore;

onMounted(async () => {
    if (currentUser.value) {


        await getMyGyms(currentUser.value.userId);
    }

})

</script>   

<template>
    <section class=" p-2 flex flex-col w-full rounded-lg">
        <h1 class="text-lg font-semibold text-black">My Gyms</h1>
        <div class=" flex flex-wrap ">


            <MyGym :gyms="myGyms" />


        </div>

    </section>
</template>

<style scoped></style>
