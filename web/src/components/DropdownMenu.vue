<script setup>

import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useHomeStore } from '@/stores/home';
import { storeToRefs } from 'pinia';
import { useTokenStore } from '@/stores/token';
import axios from 'axios';
import SearchBar from '@/components/searchBar.vue'
import DropdownMenu from '@/components/DropdownMenu.vue'

const token = useTokenStore();
const componentKey = ref(0);
const forceRerender = () => {
    componentKey.value += 1;
};
// Declare currentUser as a ref

const home = useHomeStore();
const { isOpenLogin, isOpenRegisterGym, isOpenSignUp, currentUser, isLogin } = storeToRefs(home);
const { handleLogout } = home;

// Check for token in localStorage to set isLogin state and fetch user details
onMounted(async () => {
    const tokenFromStorage = localStorage.getItem('token');
    const userFromStorage = localStorage.getItem('user');

    if (tokenFromStorage) {
        isLogin.value = true;
        axios.defaults.headers.common['Authorization'] = `Bearer ${tokenFromStorage}`;
    }

    if (userFromStorage) {
        currentUser.value = JSON.parse(userFromStorage);
    }
});

// watch(localStorage.getItem('user'), () => {
//   currentUser.value = localStorage.getItem('user')
// })





const isOpenMenu = ref(false);
const isDropdownOpen = ref(false); // To manage dropdown visibility

const toggleMenu = () => {
    isOpenMenu.value = !isOpenMenu.value;
};

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

</script>

<template>
    <nav class="hidden laptop:flex laptop:items-center ">

        <!-- <span @click="isOpenLogin = true" class="ml-16 font-medium hover:cursor-pointer" v-if="!isLogin">Login</span>
<span @click="isOpenSignUp = true" class="ml-16 font-medium hover:cursor-pointer" v-if="!isLogin">Sign up</span> -->

        <!-- Profile Picture with Dropdown -->
        <div class="relative  cursor-pointer" v-if="isLogin" @click="toggleDropdown">
            <div class="flex items-center space-x-2">
                <img src="@/assets/images/pp.jpg" alt="pp" class="w-[40px] h-[40px] rounded-full bg-gray">
                <span v-if="currentUser">{{ currentUser.firstName }}</span>

                <i class="fa-solid text-sm px-1 fa-chevron-down transition-all duration-100 ease-in-out"
                    :class="isDropdownOpen ? 'rotate-180' : ''"></i>
            </div>
            <!-- Dropdown Menu -->
            <div v-if="isDropdownOpen"
                class="absolute right-0 text-[1.05rem] top-14 text-black mt-0 w-35 bg-white rounded-lg shadow-lg text-md z-10">
                <ul>
                    <li class="py-2 px-2 hover:bg-first hover:text-white cursor-pointer rounded-t-lg">
                        <RouterLink to="/user-profile">Profile</RouterLink>
                    </li>
                    <li class="py-2 px-2 hover:bg-first hover:text-white cursor-pointer">
                        <RouterLink to="/user-profile/notifications">Notifications</RouterLink>
                    </li>
                    <li class="py-2 px-2 hover:bg-first hover:text-white cursor-pointer">
                        <RouterLink to="">Settings</RouterLink>
                    </li>
                    <li class="py-2 px-2 hover:bg-first hover:text-white cursor-pointer">
                        <RouterLink to="/user-profile/my-gyms">My Gym</RouterLink>
                    </li>
                    <li class="py-2 px-2 hover:bg-first hover:text-white cursor-pointer">
                        <RouterLink to="/user-profile/memberships">Membership</RouterLink>
                    </li>
                    <li class="py-2 px-2 hover:bg-first hover:text-white cursor-pointer">
                        <RouterLink to="/user-profile/saved">Saves</RouterLink>
                    </li>
                    <li class="py-2 px-2 hover:bg-first hover:text-white cursor-pointer rounded-b-lg" @click="handleLogout">
                        Logout
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>