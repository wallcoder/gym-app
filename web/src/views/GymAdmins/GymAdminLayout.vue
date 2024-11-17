<script setup>
import { RouterView } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import axios from 'axios';
import HeaderArea from '@/components/Header/HeaderArea2.vue'
import SidebarArea from '@/components/Sidebar/SidebarArea2.vue'
import { useHomeStore } from '@/stores/home'
import { useGymAdminStore } from '@/stores/gymAdmin'
const gymAdmin = useGymAdminStore()
const { findGym } = gymAdmin
const { ownerIdRef } = storeToRefs(gymAdmin)
const home = useHomeStore()
const { currentUser, isLogin } = storeToRefs(home)
console.log(currentUser.value)
const props = defineProps({
  gymId: { type: String, required: true }
})

const isLoading = ref(true);

onMounted(async () => {




  const tokenFromStorage = localStorage.getItem('token');
  const userFromStorage = localStorage.getItem('user');

  if (tokenFromStorage) {
    isLogin.value = true;
    axios.defaults.headers.common['Authorization'] = `Bearer ${tokenFromStorage}`;
  }

  if (userFromStorage && !currentUser.value) {
    currentUser.value = JSON.parse(userFromStorage)
    console.log("Loaded currentUser from storage:", currentUser.value);
    ownerIdRef.value = currentUser.value.userId
    console.log("current user ref: ", ownerIdRef.value)
    await findGym(Number(props.gymId), currentUser.value.userId)


  }

  isLoading.value = false; // Set loading to false once data is ready
})

watch(currentUser, (newVal) => {
  if (newVal) {
    console.log("currentUser has been set:", newVal)
  }
})

</script>
<template>
  <div class="flex h-screen overflow-hidden" v-if="!isLoading">
    <!-- ===== Sidebar Start ===== -->

    <SidebarArea :gymId="props.gymId" />
    <!-- ===== Sidebar End ===== -->

    <!-- ===== Content Area Start ===== -->
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ">
      <!-- ===== Header Start ===== -->
      <HeaderArea />
      <!-- ===== Header End ===== -->
      <div class="p-4">

        <RouterView />
      </div>
      <!-- ===== Main Content Start ===== -->

      <!-- ===== Main Content End ===== -->
    </div>
  </div>
</template>