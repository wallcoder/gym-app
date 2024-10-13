<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useHomeStore } from '../../stores/home';
import { storeToRefs } from 'pinia';
import axios from 'axios';

const home = useHomeStore();
const { isOpenLogin, isOpenRegisterGym, isOpenSignUp, isLogin } = storeToRefs(home);
const { handleLogout } = home;

// Check for token in localStorage to set isLogin state
onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    isLogin.value = true;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
});

const scroll = ref(0);
const logoOriginal = ref(null);
const logoWhite = ref(null);
const isOpenMenu = ref(false);
const isDropdownOpen = ref(false); // To manage dropdown visibility

const toggleMenu = () => {
  isOpenMenu.value = !isOpenMenu.value;
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const updateScroll = () => {
  scroll.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener('scroll', updateScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll);
});

logoOriginal.value = new URL('../../assets/images/logo-original.png', import.meta.url).href;
logoWhite.value = new URL('../../assets/images/logo-white.png', import.meta.url).href;

const background = computed(() => {
  return scroll.value ? 'laptop:bg-white text-black p-3' : 'transparent text-white p-4';
});

const logoChange = computed(() => {
  return scroll.value ? logoOriginal.value : logoWhite.value;
});
</script>

<template>
  <header
    class="flex justify-between items-center text-lg laptop:px-[20%] tablet:px-[15%] bg-transparent fixed w-full z-99999 transition-all duration-200 ease-linear bg-white laptop:bg-transparent"
    :class="` ${background}`">
    <RouterLink to="/">
      <img :src="logoChange" alt="logo-white" class=" " :class="scroll ? 'w-[45px]' : 'w-[50px]'">
    </RouterLink>
    <nav class="hidden laptop:flex laptop:items-center">
      <span @click="isOpenRegisterGym = true" class="ml-16 font-medium bg hover:cursor-pointer">Register Gym</span>
      <span @click="isOpenLogin = true" class="ml-16 font-medium hover:cursor-pointer" v-if="!isLogin">Login</span>
      <span @click="isOpenSignUp = true" class="ml-16 font-medium hover:cursor-pointer" v-if="!isLogin">Sign up</span>

      <!-- Profile Picture with Dropdown -->
      <div class="relative ml-16 " v-if="isLogin" @mouseenter="isDropdownOpen = true"
        @mouseleave="isDropdownOpen = false">
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
    </nav>

    <i class="fa-solid text-2xl text-black hover:cursor-pointer transition-all duration-200 ease-linear block laptop:hidden"
      @click="toggleMenu()" :class="isOpenMenu ? 'fa-x' : 'fa-bars'"></i>

    <nav v-if="isOpenMenu"
      class="hover:cursor-pointer flex flex-col bg-white text-black w-full h-[100vh] items-start absolute right-0 laptop:hidden transition-all duration-200 ease-linear"
      :class="scroll ? 'top-16 ' : 'top-19'">
      <span @click="isOpenRegisterGym = true"
        class="hover:cursor-pointer font-medium bg-white hover:bg-first hover:text-white text-lg py-4 px-3 w-full transition-all duration-100 ease-linear">
        Register Gym</span>
      <span @click="isOpenLogin = true"
        class="hover:cursor-pointer font-medium bg-white hover:bg-first hover:text-white text-lg py-4 px-3 w-full transition-all duration-100 ease-linear">
        Login</span>
      <span @click="isOpenSignUp = true"
        class="hover:cursor-pointer font-medium bg-white hover:bg-first hover:text-white text-lg py-4 px-3 w-full transition-all duration-100 ease-linear">
        Sign up</span>
    </nav>
  </header>
</template>
