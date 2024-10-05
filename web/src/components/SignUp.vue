<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../stores/home';
import { onClickOutside } from '@vueuse/core';
import Button from '../components/Button.vue';

const home = useHomeStore();
const { modal, isOpenLogin, isOpenRegisterGym, isOpenSignUp } = storeToRefs(home);
const { closeModals } = home;
onMounted(() => {
    onClickOutside(modal, () => {
        closeModals.value(); // Correctly call the close function
    });
})
</script>

<template>
    <Teleport to="#modal">
        <Transition>
            <div class="fixed top-0 p-4 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] dark:bg-[rgba(255,255,255,.1)] flex items-center justify-center z-[999999]"
                v-if="isOpenSignUp" >
                <div class="w-[100] max-w-sm bg-white rounded-lg shadow p-6 md:p-8 dark:bg-discount-dark" ref="modal">
                    <!-- Ensure this ref is 'modal' -->
                    <span class="flex w-full justify-end text-txt-light dark:text-txt-dark hover:cursor-pointer"
                        @click="closeModals()">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                    <h1 class="text-xl font-semibold text-black mb-2">Sign Up</h1>
                    <form class="space-y-6">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
                            <input type="email" name="email" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Enter Email" required />
                        </div>
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                Name</label>
                            <input type="name" name="name" id="name" placeholder="Enter Name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required />
                        </div>
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="remember" type="checkbox"
                                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                    required />
                            </div>
                            <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes, I
                                agree to the terms and conditions</label>
                        </div>
                        <Button content="Sign Up" extraStyle="w-full" />
                    </form>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
