<script setup>
import NavbarSecond from '@/components/Navbars/NavbarSecond.vue'
import Footer from '@/components/Footer.vue'
import { RouterView, RouterLink } from 'vue-router'
</script>
<template>
    <section class="bg-white">
        <NavbarSecond />
        <section class="h-[100vh] w-full tablet:px-[14%]  ">
            <div class="relative mb-35">
                <img src="../../assets/images/wallpaper1.png" alt="" class="w-full h-45 object-cover">
                <div class="flex justify-center items-center absolute left-0 right-0 top-25 flex-col">
                    <img src="../../assets/images/pp.jpg"
                        class="rounded-full bg-blue-200 w-40 h-40 object-cover border-4 border-white cursor-pointer hover:brightness-90 transition-all duration-200 ease-in-out"
                        alt="">
                    <h2 class="text-xl text-black font-semibold ">Sarah Wayne</h2>
                    
                </div>
                

            </div>
            <section class="flex rounded-lg shadow-3 bg-white text-black">
                <nav class="flex flex-col  w-50 h-60 ">
                    <RouterLink to="/user-profile" class="bg-white p-2 hover:bg-sixth transition-all duration-200 rounded-l-lg"
                        exact-active-class="bg-sixth">Profile
                    </RouterLink>
                    <RouterLink to="/user-profile/notifications" exact-active-class="bg-sixth" class="bg-white p-2 hover:bg-sixth transition-all duration-200">Notifications
                    </RouterLink>
                    <RouterLink to="/user-profile/memberships" exact-active-class="bg-sixth" class="bg-white p-2 hover:bg-sixth transition-all duration-200">Membership
                    </RouterLink>
                    <RouterLink to="/user-profile/saved" exact-active-class="bg-sixth" class="bg-white p-2 hover:bg-sixth transition-all duration-200">Saved</RouterLink>
                    <RouterLink to="/user-profile/my-gyms" exact-active-class="bg-sixth" class="bg-white p-2 hover:bg-sixth transition-all duration-200">My Gym</RouterLink>
                    <RouterLink to="/user-profile/my-gyms" exact-active-class="bg-sixth" class="bg-white p-2 hover:bg-sixth transition-all duration-200">Settings</RouterLink>
                </nav>
                <RouterView />

            </section>

        </section>

        <Footer />
    </section>
</template>