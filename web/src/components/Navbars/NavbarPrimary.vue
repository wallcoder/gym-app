<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useHomeStore } from '../../stores/home';
import { storeToRefs } from 'pinia';
import { useTokenStore } from '@/stores/token';
import axios from 'axios';
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

watch(localStorage.getItem('user'), () => {
  currentUser.value = localStorage.getItem('user')
})




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
    class="flex justify-between items-center text-lg tablet:px-[14%] bg-transparent absolute w-full z-99999 transition-all duration-200 ease-linear laptop:bg-transparent transparent text-white p-4">
    <RouterLink to="/">
      <img src="../../assets/images/logo-white.png" alt="logo" class="w-[50px]">
    </RouterLink>
    <nav class="hidden laptop:flex laptop:items-center space-x-10">
      <span @click="isOpenRegisterGym = true" class="font-medium hover:cursor-pointer">Register Gym</span>
      <span @click="isOpenLogin = true" class=" font-medium hover:cursor-pointer" v-if="!isLogin">Login</span>
      <span @click="isOpenSignUp = true" class=" font-medium hover:cursor-pointer" v-if="!isLogin">Sign up</span>

      <!-- Profile Picture with Dropdown -->
      <DropdownMenu />
    </nav>

    <i class="fa-solid text-3xl text-white hover:cursor-pointer transition-all duration-200 ease-linear block laptop:hidden"
      @click="toggleMenu()" :class="isOpenMenu ? 'fa-x' : 'fa-bars'"></i>
  </header>
  <nav v-if="isOpenMenu"
    class="hover:cursor-pointer flex fixed flex-col bg-white text-black w-full h-[100vh] items-start top-0 z-[100000] right-0 laptop:hidden transition-all duration-200 ease-linear">
    <div class="flex w-full justify-end py-6 px-5">
      <i class="fa-solid text-3xl text-black hover:cursor-pointer transition-all duration-200 ease-linear block laptop:hidden"
        @click="toggleMenu()" :class="isOpenMenu ? 'fa-x' : 'fa-bars'"></i>
    </div>
    <span @click="isOpenRegisterGym = true"
      class="hover:cursor-pointer font-medium bg-white hover:bg-first hover:text-white text-lg py-4 px-3 w-full transition-all duration-100 ease-linear">
      Register Gym
    </span>
    <span @click="isOpenLogin = true"
      class="hover:cursor-pointer font-medium bg-white hover:bg-first hover:text-white text-lg py-4 px-3 w-full transition-all duration-100 ease-linear">
      Login
    </span>
    <span @click="isOpenSignUp = true"
      class="hover:cursor-pointer font-medium bg-white hover:bg-first hover:text-white text-lg py-4 px-3 w-full transition-all duration-100 ease-linear">
      Sign up
    </span>
  </nav>
</template>

<style scoped>
.blend {
  mix-blend-mode: difference;
  color: #fff;
}
</style>
