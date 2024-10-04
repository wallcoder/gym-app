<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router'
const a = ref("HEHEH")
</script>
<template>
    <header class="flex justify-between items-center laptop:px-[20%] tablet:px-[15%]  fixed w-full z-99999 text-white ">
        <img src="../../assets//images//logo-white.png" alt="logo-white" class="w-[90px] h=[100px]">
        <nav class="hidden laptop:block">
            <RouterLink to="#" class="ml-16 font-medium">Register Gym</RouterLink>
            <RouterLink to="" class="ml-16">Login</RouterLink>
            <RouterLink to="#" class="ml-16">Sign up</RouterLink>
        </nav>

        <nav class="flex flex-col bg-white text-black w-full h-[100vh] items-start absolute top-20 right-0 laptop:hidden">
            <RouterLink to="#" class=" font-medium bg-white hover:bg-first hover:text-white text-lg py-4 px-3 w-full transition-all duration-100 ease-linear">Register Gym</RouterLink>
            <RouterLink to="#" class=" font-medium  bg-white hover:bg-first hover:text-white text-lg py-4 px-3 w-full transition-all duration-100 ease-linear">Login</RouterLink>
            <RouterLink to="#" class=" font-medium bg-white hover:bg-first hover:text-white text-lg py-4 px-3 w-full transition-all duration-100 ease-linear">Sign up</RouterLink>
        </nav>

    </header>
    
        

    
</template>
