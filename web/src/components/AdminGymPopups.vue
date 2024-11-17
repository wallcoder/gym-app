<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '@/stores/home';

import { onClickOutside } from '@vueuse/core';
import Button from '@/components/Button.vue';

import { useAdminStore } from '@/stores/admin'

const admin = useAdminStore();

const { isOpen, modal, selectedGym, receiverId } = storeToRefs(admin)
const { closeModals, setGymVerified } = admin
const api = import.meta.env.VITE_API;


const currentImageIndex = ref(0);

const nextImage = () => {
    if (selectedGym.value && selectedGym.value.GymImages) {
        currentImageIndex.value = (currentImageIndex.value + 1) % selectedGym.value.GymImages.length;
    }
};

const prevImage = () => {
    if (selectedGym.value && selectedGym.value.GymImages) {
        currentImageIndex.value = (currentImageIndex.value - 1 + selectedGym.value.GymImages.length) % selectedGym.value.GymImages.length;
    }
};

setInterval(nextImage, 8000);
onMounted(() => {
    onClickOutside(modal, () => {
        closeModals()
    });




})





</script>

<template>
    <Teleport to="#modal">
        <Transition name="modal">
            <div class="fixed top-0 p-4 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] dark:bg-[rgba(255,255,255,.1)] flex items-center justify-center z-[999999]"
                v-if="isOpen.gymDetails">
                <div ref="modal"
                    class="p-2 bg-gray-100 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 min-w-[500px] tablet:w-[90%] overflow-y-auto max-h-[95vh]">

                    <div class="flex w-full justify-end my-2"><i class="fa-solid fa-xmark hover:cursor-pointer"
                            @click="closeModals()"></i></div>
                    <div class="relative  ">

                        <img v-if="selectedGym?.GymImages?.length"
                            :src="`${api}${selectedGym.GymImages[currentImageIndex].gymImgPath}`" alt="gym"
                            class="w-full rounded-lg h-[80vh] object-cover transition duration-500 ease-in-out"
                            v-motion-fade-visible-once />
                        <button @click="prevImage"
                            class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>
                        <button @click="nextImage"
                            class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                    <div class="flex justify-between my-1">
                        <h1 class="text-2xl my-2 font-semibold">{{ selectedGym.gymName }}</h1>
                        <span class="flex space-x-2 items-center">
                            <a :href="`https://www.google.com/maps?q=${selectedGym.GymLocation.latitude},${selectedGym.GymLocation.longitude}`" target="_blank" class="'p-2 font-semibold rounded-3xl my-2 px-8 transition-all duration-200 ease-linear bg-[#0A86D9] text-white py-2 hover:brightness-[1.1]">Direction</a>
                            <a :href="`${api}${selectedGym.gymLicense}`" target="_blank" class="'p-2 font-semibold rounded-3xl my-2 px-8 transition-all duration-200 ease-linear bg-[#E24C7A] text-white py-2 hover:brightness-[1.1]">Check License</a>
                            <button class="p-2 font-semibold rounded-3xl my-2 px-8 transition-all duration-200 ease-linear bg-[#0A86D9] text-white py-2 " v-if="selectedGym.status == 'verified'">Verified {{  }}</button>
                            <Button content="Mark As Verified" :handler="() => {setGymVerified(selectedGym.id, selectedGym.ownerId, selectedGym.PlanMappings[0].id) }" v-else/>
                        </span>
                    </div>
                    <div class="flex ">
                        <h1 class="text-md my-1 flex space-x-1"><span>{{ selectedGym.GymLocation.area }} | {{
                            selectedGym.GymLocation.buildingNo
                        }} | {{ selectedGym.GymLocation.city }} | {{ receiverId.value }}</span> <span>|</span> </h1>

                        <h2></h2>
                    </div>
                    <div class="flex">
                        

                    </div>





                </div>
            </div>
        </Transition>
    </Teleport>
</template>


<style scoped></style>
