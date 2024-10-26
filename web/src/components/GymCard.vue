<script setup>
const api = import.meta.env.VITE_API
console.log(api)
const props = defineProps({
    gyms: {
        type: Array,
        required: true
    }
})

</script>
<template>
    <div class="grid grid-cols-1  smartphone-md:grid-cols-2 tablet:grid-cols-3">
        <div v-for="gym in props.gyms" :key="gym.id" class="rounded-xl shadow-4 relative main bg-white m-2 tablet:m-3">

            <RouterLink :to="`gyms/gym/${gym.id}`">
                <img :src="`${api}${gym.profileImage}`" alt="gym" class="rounded-xl w-full h-[200px]" />
            </RouterLink>

            <div
                class="absolute inset-0 w-28 h-8 flex items-center text-xs p-2 font-medium bg-black bg-opacity-50 text-white rounded-xl">
                <h3>&#8377; {{ gym.Plans[0].price }}/{{ gym.Plans[0].duration == 1 ? '' : gym.Plans[0].duration }}month</h3>
            </div>

            <div class="flex justify-between">
                <div class="p-2 flex flex-col">
                    <h2 class="text-black">{{ gym.gymName }}</h2>
                    <h3 class="font-medium text-sm">{{ gym.GymLocation.area }}, {{ gym.GymLocation.city }}</h3>
                    <h3 class="font-medium text-sm"><i class="fa-solid fa-star text-yellow-500"></i></h3>
                </div>
                <div>
                    <i class="fa-solid fa-bookmark text-sixth text-2xl mr-2 mt-2 cursor-pointer"></i>
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