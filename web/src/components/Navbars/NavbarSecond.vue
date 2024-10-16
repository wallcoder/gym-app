<script setup>
import { ref, onMounted } from 'vue'
const isDropdownOpen = ref(false)
import { useHomeStore } from '../../stores/home';
import { storeToRefs } from 'pinia';
import axios from 'axios'

onMounted(() => {
    const token = localStorage.getItem('token');
    if (token) {
        isLogin.value = true;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
});

const home = useHomeStore();
const { isOpenLogin, isOpenRegisterGym, isOpenSignUp, isLogin } = storeToRefs(home);
const { handleLogout } = home;
</script>
<template>
    <header class="flex sticky top-0 w-full z-10 justify-between items-center text-lg px-4 laptop:px-[14%] tablet:px-[15%] bg-white py-2 shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
        
        <RouterLink to="/" >
            <img src="../../assets/images/logo-black.png" alt="logo-black" class="w-[40px]">
        </RouterLink>
        
        
        <div class="relative ml-16 " @mouseenter="isDropdownOpen = true" @mouseleave="isDropdownOpen = false"
            v-if="isLogin">
            <img src="../../assets/images/pp.jpg" alt="pp" class="w-[40px] h-[40px] rounded-full bg-gray cursor-pointer">

            <!-- Dropdown Menu -->
            <div v-if="isDropdownOpen" class="absolute left-8  text-black mt-0 w-48 bg-white rounded-sm shadow-lg text-md">
                <ul>
                    <li class="py-2 px-4 hover:bg-first hover:text-white cursor-pointer">Profile</li>
                    <li class="py-2 px-4 hover:bg-first hover:text-white cursor-pointer">Settings</li>
                    <li class="py-2 px-4 hover:bg-first hover:text-white cursor-pointer" @click="handleLogout">Logout</li>
                </ul>
            </div>
        </div>


    </header>
</template>