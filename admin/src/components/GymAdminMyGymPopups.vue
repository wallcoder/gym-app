<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '@/stores/home';

import { onClickOutside } from '@vueuse/core';
import Button from '@/components/Button.vue';

import { useAdminStore } from '@/stores/admin'
import { useGymAdminStore } from '@/stores/gymAdmin'
const gymAdmin = useGymAdminStore();
const { isOpenGallery, myGym, currentImageId, message, gymIdRef, modal } = storeToRefs(gymAdmin)
const { closeModals, addGymImage, deleteGymImage } = gymAdmin;

// const admin = useAdminStore();
// const { isOpen, modal, myGym, receiverId } = storeToRefs(admin)
// const { closeModals, setGymVerified } = admin

const api = import.meta.env.VITE_API;

console.log("current image: ", currentImageId.value)
const currentImageIndex = ref(0);
if(myGym.value.GymImages.length > 0){
currentImageId.value = myGym.value.GymImages[currentImageIndex.value].id
}
const nextImage = () => {
    if (myGym.value && myGym.value.GymImages) {
        currentImageIndex.value = (currentImageIndex.value + 1) % myGym.value.GymImages.length;
    }
};

const prevImage = () => {
    if (myGym.value && myGym.value.GymImages) {
        currentImageIndex.value = (currentImageIndex.value - 1 + myGym.value.GymImages.length) % myGym.value.GymImages.length;
    }
};

watch(currentImageIndex, (newVal) => {
    currentImageId.value = myGym.value.GymImages[newVal].id
})

// setInterval(nextImage, 8000);
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
                v-if="isOpenGallery">
                <div ref="modal"
                    class="p-2 bg-gray-100 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 min-w-[500px] tablet:w-[90%] overflow-y-auto max-h-[95vh]">

                    <div class="flex w-full justify-end my-2"><i class="fa-solid fa-xmark hover:cursor-pointer"
                            @click="closeModals()"></i></div>
                    <div class="relative  ">

                        <img v-if="myGym?.GymImages?.length" :src="`${api}${myGym.GymImages[currentImageIndex].gymImgPath}`"
                            alt="gym" class="w-full rounded-lg h-[80vh] object-cover transition duration-500 ease-in-out"
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
                    <!-- <span class="text-red">{{ message.value.gymImages }}</span> -->
                    <div class="flex w-full justify-end space-x-2">

                        <Button content="Delete" :handler="() => { deleteGymImage(currentImageId, gymIdRef) }"
                            extraStyle="bg-[#3C50E0] hover:bg-[#3C50E0] hover:brightness-150" />
                        <input type="file" class="hidden" name="" id="addImage" multiple @change="addGymImage">
                        <label for="addImage"
                            class="bg-[#3C50E0] cursor-pointer p-2 font-semibold rounded-3xl my-2 px-8 transition-all duration-200 ease-linear hover:brightness-150 text-white py-2">Add</label>

                    </div>







                </div>
            </div>
        </Transition>
    </Teleport>
</template>


<style scoped></style>
