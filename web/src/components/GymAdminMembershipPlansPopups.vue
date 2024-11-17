<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '@/stores/home';

import { onClickOutside } from '@vueuse/core';
import Button from '@/components/Button.vue';

import { useAdminStore } from '@/stores/admin'
import { useGymAdminStore } from '@/stores/gymAdmin'
const gymAdmin = useGymAdminStore();
const { isOpenGallery, isOpenAddPlan, myGym, currentImageId, message, gymIdRef, modal, plan } = storeToRefs(gymAdmin)
const { closeModals, addGymImage, deleteGymImage, addMembershipPlan } = gymAdmin;

// const admin = useAdminStore();
// const { isOpen, modal, myGym, receiverId } = storeToRefs(admin)
// const { closeModals, setGymVerified } = admin

const api = import.meta.env.VITE_API;

console.log("current image: ", currentImageId.value)
const currentImageIndex = ref(0);
if (myGym.value.GymImages.length > 0) {
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
                v-if="isOpenAddPlan">
                <div ref="modal"
                    class="bg-gray-100 rounded-sm border border-stroke bg-white   shadow-default dark:border-strokedark dark:bg-boxdark p-7 min-w-[500px] tablet:w-[30%] overflow-y-auto max-h-[95vh]">
                    <div class="flex w-full justify-end "><i class="fa-solid fa-xmark hover:cursor-pointer"
                        @click="closeModals()"></i></div>
                    <h1 class="text-xl mb-2">Membership Plans </h1>
                    
                    <form class="flex flex-col gap-5.5" @submit.prevent="addMembershipPlan(gymIdRef)">
                        <div>
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                Plan Name
                            </label>
                            <input type="text" placeholder="Enter Plan Name" v-model="plan.title"
                                class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                        </div>
                        
                        <div>
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                Price
                            </label>
                            <input type="text" placeholder="Enter Price" v-model="plan.price"
                                class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                        </div>
                        <div>
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                Version
                            </label>
                            <input type="number" placeholder="Enter Version" v-model="plan.version"
                                class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                        </div>

                        <div>
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                Description
                            </label>
                            <textarea rows="2" placeholder="Write Description" v-model="plan.description"
                                class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"></textarea>
                        </div>
                        <h1 class="text-md  text-orange-500">Warning: You won't be able to edit this info </h1>

                        <Button content="Submit" buttonType="submit"/>
                        
                    </form>






                </div>
            </div>
        </Transition>
    </Teleport>
</template>


<style scoped></style>
