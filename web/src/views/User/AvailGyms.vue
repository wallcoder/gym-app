<script setup>
import NavbarSecond from '@/components/Navbars/NavbarSecond.vue'
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import GymCard from '@/components/GymCard.vue'
import ButtonLink from '@/components/ButtonLink.vue'
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
    <section>
        
        <section class=" py-10 w-full font-semibold flex flex-col items-center tablet:px-[12%]  ">
            <h1 class="text-2xl tablet:text-3xl text-black text-center">All Available Gyms in <span
                    class="text-first">Aizawl</span></h1>
           <GymCard :gyms="gyms" />
        
           
        </section>
    </section>
</template>
<style scoped>

</style>