<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useHomeStore } from '../../stores/home';
import { storeToRefs } from 'pinia';
import { useTokenStore } from '@/stores/token';
import axios from 'axios';
import SearchBar from '@/components/searchBar.vue'

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
        class="flex justify-between items-center text-lg tablet:px-[14%] bg-second text-white  w-full z-99999 transition-all duration-200 ease-linear py-3 ">
        <RouterLink to="/" class="">
            <img src="../../assets/images/logo-white.png" alt="logo" class="w-[40px]">
        </RouterLink>

        <nav class="hidden laptop:flex laptop:items-center ">

            <!-- <span @click="isOpenLogin = true" class="ml-16 font-medium hover:cursor-pointer" v-if="!isLogin">Login</span>
      <span @click="isOpenSignUp = true" class="ml-16 font-medium hover:cursor-pointer" v-if="!isLogin">Sign up</span> -->

            <!-- Profile Picture with Dropdown -->
            <div class="relative  cursor-pointer" v-if="isLogin" @click="toggleDropdown">
                <div class="flex items-center space-x-2">
                    <img src="../../assets/images/pp.jpg" alt="pp" class="w-[40px] h-[40px] rounded-full bg-gray">
                    <span v-if="currentUser">{{ currentUser.firstName }}</span>

                    <i class="fa-solid text-sm px-1 fa-chevron-down transition-all duration-100 ease-in-out"
                        :class="isDropdownOpen ? 'rotate-180' : ''"></i>
                </div>
                <!-- Dropdown Menu -->
                <div v-if="isDropdownOpen"
                    class="absolute right-0 text-[1.05rem] top-14 text-black mt-0 w-35 bg-white rounded-lg shadow-lg text-md z-10">
                    <ul>
                        <li class="py-2 px-2 hover:bg-first hover:text-white cursor-pointer rounded-t-lg">
                            <RouterLink to="">Profile</RouterLink>
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
                            <RouterLink to="/user-profile/membership">Membership</RouterLink>
                        </li>
                        <li class="py-2 px-2 hover:bg-first hover:text-white cursor-pointer">
                            <RouterLink to="/user-profile/saved">Saves</RouterLink>
                        </li>
                        <li class="py-2 px-2 hover:bg-first hover:text-white cursor-pointer rounded-b-lg"
                            @click="handleLogout">Logout
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

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
