<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../stores/home';

import { onClickOutside } from '@vueuse/core';
import Button from '../components/Button.vue';

const home = useHomeStore();
const { modal,  isOpenDeleteAccount, firstName, lastName, email, password, conPassword, message, currentUser } = storeToRefs(home);
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
                v-if="isOpenDeleteAccount">
                <div class=" w-full smartphone-md:w-[350px]  bg-white rounded-lg shadow p-6 md:p-8 dark:bg-discount-dark"
                    ref='modal'>
                    <!-- Ensure this ref is 'modal' -->
                    <span class="flex w-full justify-end text-txt-light dark:text-txt-dark ">
                        <i class="fa-solid fa-xmark hover:cursor-pointer" @click="closeModals()"></i>
                    </span>
                    <h1 class="text-xl font-semibold text-black mb-4">Delete Account</h1>


                    <form class="max-w-md mx-auto" @submit.prevent="handleRegister">
                        <div class="text-sm">You can delete your account only if you have no ongoing memberships/subscriptions. Note that all the gyms owned by this account will also be deleted. </div>
                        <div class="text-sm mt-2 font-semibold ">Are you sure you want to delete your account? </div>
                        <div class="text-sm mt-2 font-semibold ">Your account cannot be deleted because you have ongoing membership/subscription plan(s).</div>
                       
                        <div class="flex space-x-2">
                        <Button content="Yes" buttonType="button" extraStyle="w-[50%]" />
                        <Button @click="closeModals()" content="No" buttonType="button" extraStyle="w-[50%]" />
                    </div>
                    </form>

                </div>
            </div>
        </Transition>
    </Teleport>
</template>


<style scoped></style>
