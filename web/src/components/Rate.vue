<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../stores/home';

import { onClickOutside } from '@vueuse/core';
import Button from '../components/Button.vue';

const home = useHomeStore();
const { modal,  isOpenRate, firstName, lastName, email, password, conPassword, message, currentUser } = storeToRefs(home);
const { closeModals, handleRegister } = home;

// Reactive variable to hold the current whole-number rating
const rating = ref(3);
const hoverRating = ref(0); // Holds the rating during hover for a preview effect

// Function to set the rating when a star is clicked
const setRating = (value) => {
  rating.value = value;
};

// Function to handle hover effect for previewing rating
const setHoverRating = (value) => {
  hoverRating.value = value;
};
    onClickOutside(modal, () => {
        closeModals()
    });

    




</script>

<template>
    <Teleport to="#modal">
        <Transition name="modal">
            <div class="fixed top-0 p-4 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] dark:bg-[rgba(255,255,255,.1)] flex items-center justify-center z-[999999]"
                v-if="isOpenRate">
                <div class=" w-full flex flex-col space-y-3 smartphone-md:w-[350px]  bg-white rounded-lg shadow p-6 md:p-8 dark:bg-discount-dark"
                    ref='modal'>
                    <!-- Ensure this ref is 'modal' -->
                    <span class="flex w-full justify-end text-txt-light dark:text-txt-dark ">
                        <i class="fa-solid fa-xmark hover:cursor-pointer" @click="closeModals()"></i>
                    </span>
                    <h1 class="text-xl font-semibold text-black mb-4 text-center">Rate Us</h1>
                    
                    <div class="flex space-x-1 justify-center items-center">
     
                        <template v-for="star in 5" :key="star">
                            <svg
                                    @click="setRating(star)"
                                    @mouseover="setHoverRating(star)"
                                    @mouseleave="setHoverRating(0)"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    :class="{
                                        'text-yellow-400': star <= (hoverRating || rating),
                                        'text-gray-300': star > (hoverRating || rating)
                                    }"
                                    class="w-8 h-8 cursor-pointer transition-all duration-150 ease-in-out"
                                    >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            
                        </template>
                        
                    </div>
                    <Button content="Submit"/>

    
                    

                </div>
            </div>
        </Transition>
    </Teleport>
</template>


<style scoped></style>
