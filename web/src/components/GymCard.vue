<script>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const gyms = ref([
    {
        id: 1,
        name: "Lotus Gym",
        rating: 4.2,
        price: 1000,
        location: "Ape Town, Karma Land",
        imgPath: new URL('../assets/images/gym.jpg', import.meta.url).href
    },
    {
        id: 2,
        name: "Rogue Gym",
        rating: 4.4,
        price: 2000,
        location: "Willow Creek, Piltover",
        imgPath: new URL('../assets/images/wallpaper2.jpg', import.meta.url).href
    },
    {
        id: 3,
        name: "Bombastic Gym",
        rating: 4.4,
        price: 2000,
        location: "Bombastic Town, Piltover",
        imgPath: new URL('../assets/images/wallpaper2.jpg', import.meta.url).href
    },
    {
        id: 3,
        name: "Bombastic Gym",
        rating: 4.4,
        price: 2000,
        location: "Bombastic Town, Piltover",
        imgPath: new URL('../assets/images/wallpaper2.jpg', import.meta.url).href
    },
    {
        id: 3,
        name: "Bombastic Gym",
        rating: 4.4,
        price: 2000,
        location: "Bombastic Town, Piltover",
        imgPath: new URL('../assets/images/wallpaper2.jpg', import.meta.url).href
    }

])
</script>
<template>
    <RouterLink to="#" v-for="gym in gyms" :key="gym.id"
        class="rounded-xl w-[250px] shadow-4 relative  main bg-white flex-grow-1 m-2">
        <img :src="gym.imgPath" alt="gym" class="rounded-xl w-full h-[200px]" />
        <div
            class="absolute inset-0 w-28  h-8 flex  items-center text-xs p-2 font-medium  bg-black bg-opacity-50 text-white rounded-xl">
            <h3>&#8377; {{ gym.price }}/month</h3>


        </div>
        <div class="p-2 flex flex-col">
            <h2 class="text-black">{{ gym.name }}</h2>
            <h3 class="font-medium text-sm">{{ gym.location }}</h3>
            <h3 class="font-medium text-sm"><i class="fa-solid fa-star text-yellow-500"></i> {{ gym.rating }}
            </h3>
        </div>
    </RouterLink>
</template>
<style scoped>

.gym-card img {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    object-fit: cover;
}

.gym-card .main {
    transition: all 200ms linear;
}

.gym-card .main:hover {
    transform: scale(1.025);


}

</style>