<script setup>
import {storeToRefs } from 'pinia'
import {useHomeStore} from '@/stores/home'
const home = useHomeStore();
const {isOpenEditProfile} = storeToRefs(home)
</script>
<template>
    <section class="p-2 flex flex-col rounded-lg " v-motion-fade-visible-once>
        <h1 class="text-lg font-semibold text-black">Profile</h1>
        <div class="flex mt-8 items-center justify-between">
            <div class="flex items-center space-x-2  ">
                <img src="../../assets/images/pp.jpg" class="w-30 h-30 rounded-full object-cover" alt="">
                <div class="flex flex-col">
                    <i class="fa-solid fa-edit cursor-pointer text-sm" @click="isOpenEditProfile = true"></i>
                    <span>Sarah Wayne </span>
                    <span>sarahwayne@gmail.com</span>
                    <span class="text-[#8a8a8a] text-sm">Joined at: 10/20/2024</span>

                    
                </div>
            </div>
            

        </div>
    </section>
</template>