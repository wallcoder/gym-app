<script setup>
import Button from './Button.vue'
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../stores/home';
import { onClickOutside } from '@vueuse/core';
const home = useHomeStore();
const { modal, isOpenLogin, isOpenRegisterGym, isOpenSignUp } = storeToRefs(home);
const { closeModals } = home;
const activateRegisterGym = () => {
    isOpenRegisterGym.value = true
}
onMounted(() => {
    onClickOutside(modal, () => {
        closeModals()
    });
})
</script>

<template>
    <section class="w-full font-semibold flex flex-col items-center tablet:px-0  relative h-[350px] ">
        <img src="../assets/images/gym.jpg" alt="" class="h-full w-full object-cover brightness-50">
        <div class="absolute p-5 flex flex-col justify-center items-center w-[90%] laptop:w-[50%] h-full ">


            <h1 class="text-2xl tablet:text-3xl  text-center  text-white my-2">Do You Own a Gym? Partner with Us</h1>
            <p class="text-center text-white my-2">Register your gym and expand your reach to more fitness enthusiasts! Join
                our platform to enhance your visibility, connect with potential members, and promote your unique offerings.
                Let us help you grow your fitness community!</p>
            <!-- <Button content='Get Started' :handler="activateRegisterGym()"/> -->
        </div>


    </section>
</template>../stores/auth