<script setup>
import {useHomeStore} from '@/stores/home';
import {storeToRefs} from 'pinia'
const home = useHomeStore();

const {handleSave } = home
const { savedGyms} = storeToRefs(home)
const api = import.meta.env.VITE_API

const props = defineProps({
    gyms: {
        type: Array,
        required: true
    }
})

</script>
<template>
    <div class="grid grid-cols-1  smartphone-md:grid-cols-2 tablet:grid-cols-3">
        
        <div v-for="gym in props.gyms" :key="gym.id" class="rounded-xl shadow-4 relative main bg-white m-2 tablet:m-3  min-w-[250px] tablet:min-w-[280px]" v-motion-fade-visible-once >

            <RouterLink :to="`/gym-admin/${gym.id}`" target="_blank">
                <img :src="`${api}${gym.profileImage}`" alt="gym" class="rounded-xl w-full h-[200px]" />
            </RouterLink>

            
            <div class="flex justify-between">
                <div class="p-2 flex flex-col">
                    <h2 class="text-black">{{ gym.gymName }}  </h2>
                    <h3 class="font-medium text-sm">{{ gym.GymLocation.area }}, {{ gym.GymLocation.city }} </h3>
                    <h3 class="font-medium text-sm"><i class="fa-solid fa-star text-yellow-500"></i></h3>
                </div>
                
            </div>
        </div>
    </div>
</template>
  
<style scoped>
img {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    object-fit: cover;
}

.main {
    transition: all 200ms linear;
}

.main:hover {
    transform: scale(1.005);


}
</style>