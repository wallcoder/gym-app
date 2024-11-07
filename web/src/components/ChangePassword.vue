<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../stores/home';

import { onClickOutside } from '@vueuse/core';
import Button from '../components/Button.vue';

const home = useHomeStore();
const { modal,  isOpenChangePassword, firstName, lastName, email, password, conPassword, message, currPassword, currentUser } = storeToRefs(home);
const { closeModals, handleRegister } = home;



onMounted(() => {
    onClickOutside(modal, () => {
        closeModals()
    });

    firstName.value = currentUser.value.firstName;
    lastName.value = currentUser.value.lastName;


})


</script>

<template>
    <Teleport to="#modal">
        <Transition name="modal">
            <div class="fixed top-0 p-4 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] dark:bg-[rgba(255,255,255,.1)] flex items-center justify-center z-[999999]"
                v-if="isOpenChangePassword">
                <div class=" w-full smartphone-md:w-[350px]  bg-white rounded-lg shadow p-6 md:p-8 dark:bg-discount-dark"
                    ref='modal'>
                    <!-- Ensure this ref is 'modal' -->
                    <span class="flex w-full justify-end text-txt-light dark:text-txt-dark ">
                        <i class="fa-solid fa-xmark hover:cursor-pointer" @click="closeModals()"></i>
                    </span>
                    <h1 class="text-xl font-semibold text-black mb-4">Change Password</h1>


                    <form class="max-w-md mx-auto" @submit.prevent="handleRegister">
                        <div class="relative z-0 w-full mb-5 group flex justify-center">
                            <!-- <img src="@/assets/images/pp.jpg" class="w-30 h-30 rounded-full object-cover bg-gray"
                                alt=""> -->
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input v-model="currPassword" type="password" name="floating_currPassword" id="floating_currPassword"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                placeholder=" " required />
                            <label for="floating_currPassword"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Current Password</label>
                            <span class="text-red text-xs font-semibold"></span>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input v-model="password" type="password" name="floating_password" id="floating_password"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-first peer"
                                placeholder=" " required />
                            <label for="floating_password"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
                            <span class="text-red text-xs font-semibold"></span>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input v-model="conPassword" type="password" name="floating_conPassword" id="floating_conPassword"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-first peer"
                                placeholder=" " required />
                            <label for="floating_password"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                            <span class="text-red text-xs font-semibold"></span>
                        </div>
                        
                       

                        <Button content="Save" buttonType="submit" extraStyle="w-full" />
                    </form>

                </div>
            </div>
        </Transition>
    </Teleport>
</template>


<style scoped></style>
