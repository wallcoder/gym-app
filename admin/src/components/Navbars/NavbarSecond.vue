<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useHomeStore } from '../../stores/home';
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
  <header
    class="flex justify-between items-center text-lg tablet:px-[14%] bg-white text-black  w-full z-99999 transition-all duration-200 ease-linear py-3 shadow-3">
    <RouterLink to="/" class="">
      <img src="../../assets/images/logo-original.png" alt="logo" class="w-[40px]">
    </RouterLink>
    <SearchBar />
    <DropdownMenu />

    <!-- <i class="fa-solid text-3xl text-black hover:cursor-pointer transition-all duration-200 ease-linear block laptop:hidden"
      @click="toggleMenu()" :class="isOpenMenu ? 'fa-x' : 'fa-bars'"></i> -->
  </header>
</template>
  

<style scoped>
.blend {
  mix-blend-mode: difference;
  color: #fff;
}
</style>
