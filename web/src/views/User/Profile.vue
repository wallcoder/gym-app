<script setup>
import { storeToRefs } from 'pinia'
import { useHomeStore } from '@/stores/home'
import { usePlanStore } from '@/stores/plans'

const plan = usePlanStore()
const { formatDate } = plan
const home = useHomeStore();
const { isOpenEditProfile, currentUser, isOpenChangePassword, isOpenDeleteAccount } = storeToRefs(home)
</script>
<template>
    <section class="p-2 flex flex-col rounded-lg " v-motion-fade-visible-once>
        <h1 class="text-lg font-semibold text-black">Profile </h1>
        <div class="flex mt-8 items-center justify-between">
            <div class="flex items-center space-x-2  ">
                <img v-if="currentUser"
                    :src="currentUser.googleId ? `${currentUser.imgPath}` : `${api}${currentUser.imgPath}`"
                    class="w-30 h-30 rounded-full object-cover" alt="">
                <div class="flex flex-col" v-if="currentUser">
                    
                    <i class="fa-solid fa-edit cursor-pointer text-sm" @click="isOpenEditProfile = true"></i>
                    <span>{{ currentUser.firstName }} {{ currentUser.lastName }} </span>
                    <span>{{ currentUser.email }}</span>
                    <span class="text-[#8a8a8a] text-sm">Joined at: {{ formatDate(currentUser.createdAt) }}</span>
                    <span class=" text-sm font-semibold  flex space-x-2">
                        <span class="text-first hover:underline cursor-pointer " @click="isOpenChangePassword = true">Change
                            Password</span>
                        <span class="text-red hover:underline cursor-pointer " @click="isOpenDeleteAccount = true">Delete
                            Account</span> </span>

                </div>
            </div>


        </div>
    </section>
</template>