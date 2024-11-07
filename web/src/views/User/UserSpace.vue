<script setup>
import NavbarSecond from '@/components/Navbars/NavbarSecond.vue'
import Footer from '@/components/Footer.vue'

import { RouterView, RouterLink } from 'vue-router'
import {ref} from 'vue'
import {storeToRefs} from 'pinia'
import EditProfile from '@/components/EditProfile.vue'
import DeleteAccount from '@/components/DeleteAccount.vue'
import ChangePassword from '@/components/ChangePassword.vue'
import {useHomeStore} from '@/stores/home'
const home = useHomeStore();

const {isOpenEditProfile, currentUser} = storeToRefs(home)

</script>
<template>
    <section class="bg-white" >
        <NavbarSecond />
        <section class=" w-full tablet:px-[14%] mb-29  " v-motion-fade-visible-once>
            <div class="relative mb-35">
                <img src="../../assets/images/wallpaper1.png" alt="" class="w-full h-45 object-cover">
                <div class="flex justify-center items-center absolute left-0 right-0 top-25 flex-col">
                    <img :src="currentUser.googleId ? `${currentUser.imgPath}`: `${api}${currentUser.imgPath}`" v-if="currentUser"
                        class="rounded-full bg-blue-200 w-40 h-40 object-cover border-4 border-white cursor-pointer hover:brightness-90 transition-all duration-200 ease-in-out"
                        alt="pp">
                    <h2 class="text-xl text-black font-semibold " v-if="currentUser">{{ currentUser.firstName }} {{ currentUser.lastName }}</h2>
                </div>
            </div>
            <section class="flex rounded-lg shadow-3 bg-white text-black min-h-[45vh]">
                <nav class="flex flex-col  ">
                    <RouterLink to="/user-profile"
                        class="bg-white py-2 px-4 hover:bg-sixth transition-all duration-200 rounded-l-lg  "
                        active-class="bg-sixth">Profile
                    </RouterLink>
                    <RouterLink to="/user-profile/notifications"
                        class="bg-white py-2 px-4 hover:bg-sixth transition-all duration-200" active-class="bg-sixth">
                        Notifications
                    </RouterLink>
                    <RouterLink to="/user-profile/memberships"
                        class="bg-white py-2 px-4 hover:bg-sixth transition-all duration-200" active-class="bg-sixth">Membership
                    </RouterLink>
                    <RouterLink to="/user-profile/saved" class="bg-white py-2 px-4 hover:bg-sixth transition-all duration-200"
                        active-class="bg-sixth">Saved</RouterLink>
                    <RouterLink to="/user-profile/my-gyms" class="bg-white py-2 px-4 hover:bg-sixth transition-all duration-200"
                        active-class="bg-sixth">My Gym</RouterLink>
                    
                </nav>
                <div class="px-3 py-2 w-full  ">
                    <RouterView v-motion-fade-visible-once/>
                </div>
            </section>
        </section>
        <Footer />
        <EditProfile />
        <ChangePassword />
        <DeleteAccount />
    </section>
</template>

