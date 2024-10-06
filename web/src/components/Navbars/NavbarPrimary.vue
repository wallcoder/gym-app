<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

import {useHomeStore} from '../../stores/home'
import { useMotion } from '@vueuse/motion';
import {storeToRefs} from 'pinia';

const home = useHomeStore();
const {isOpenLogin, isOpenRegisterGym, isOpenSignUp} = storeToRefs(home)




// const { motion } = useMotion({
//     initial: { opacity: 0, scale: 0.5, rotate: -45 },
//     enter: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.7, easing: 'ease-out' } },
//     leave: { opacity: 0, scale: 0.5, rotate: -45, transition: { duration: 0.5, easing: 'ease-in' } },
// });


const scroll = ref(0);

const logoOriginal = ref(null)
const logoWhite = ref(null)
const isOpenMenu = ref(false)

const toggleMenu = () => {
    isOpenMenu.value = !isOpenMenu.value
}
const updateScroll = () => {
    scroll.value = window.scrollY;
};

onMounted(() => {
    window.addEventListener('scroll', updateScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll);
});
logoOriginal.value = new URL('../../assets/images/logo-original.png', import.meta.url).href
logoWhite.value = new URL('../../assets/images/logo-white.png', import.meta.url).href
const background = computed(() => {
    return scroll.value ? ' laptop:bg-white text-black p-3' : 'transparent text-white p-4'
})
const logoChange = computed(() => {
    return scroll.value ? logoOriginal.value : logoWhite.value;
})



</script>
<template>
    <header
        class="flex justify-between items-center text-lg laptop:px-[20%] tablet:px-[15%] bg-transparent  fixed w-full z-99999 transtion-all duration-200 ease-linear bg-white laptop:bg-transparent"
        :class="` ${background}`">
        <img :src="logoChange" alt="logo-white" class=" " :class="scroll ? 'w-[45px]' : 'w-[50px]'">
        <nav class="hidden laptop:block">
            
            <span @click="isOpenRegisterGym = true" class="ml-16 font-medium bg hover:cursor-pointer ">Register Gym</span>
            <span @click="isOpenLogin = true" class="ml-16 font-medium hover:cursor-pointer ">Login</span>
            <span @click="isOpenSignUp = true" class="ml-16 font-medium hover:cursor-pointer ">Sign up</span>
        </nav>
        <i class="fa-solid  text-2xl text-black hover:cursor-pointer transition-all duration-200 ease-linear block laptop:hidden"
            @click="toggleMenu()" :class="isOpenMenu ? 'fa-x' : 'fa-bars'"></i>

        
            <nav  v-if="isOpenMenu"
                class=" hover:cursor-pointer flex flex-col bg-white text-black w-full h-[100vh] items-start absolute right-0 laptop:hidden transition-all duration-200 ease-linear"
                :class="scroll ? 'top-16 ' : 'top-19'">
                <span @click="isOpenRegisterGym = true"
                    class=" hover:cursor-pointer  font-medium bg-white hover:bg-first hover:text-white text-lg py-4 px-3 w-full transition-all duration-100 ease-linear">
                    Register Gym</span>
                <span  @click="isOpenLogin = true"
                    class=" hover:cursor-pointer  font-medium  bg-white hover:bg-first hover:text-white text-lg py-4 px-3 w-full transition-all duration-100 ease-linear">
                    Login</span>
                <span @click="isOpenSignUp = true"
                    class=" hover:cursor-pointer  font-medium bg-white hover:bg-first hover:text-white text-lg py-4 px-3 w-full transition-all duration-100 ease-linear">
                    Sign up</span>
            </nav>
       



</header></template>
