<script setup >
import { useSidebarStore } from '@/stores/sidebar'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import SidebarItem from './SidebarItem2.vue'
import {RouterLink} from 'vue-router'

const target = ref(null)

const sidebarStore = useSidebarStore()

onClickOutside(target, () => {
  sidebarStore.isSidebarOpen = false
})


</script>

<template>
  <aside
    class="absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0"
    :class="{
      'translate-x-0': sidebarStore.isSidebarOpen,
      '-translate-x-full': !sidebarStore.isSidebarOpen
    }"
    ref="target"
  >
    <!-- SIDEBAR HEADER -->
    <div class="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 ">
      <router-link to="/" class="flex pl-4">
        <h1 class="text-white font-semibold text-xl">Admin</h1>
      </router-link>

      <button class="block lg:hidden" @click="sidebarStore.isSidebarOpen = false">
        <svg
          class="fill-current"
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
            fill=""
          />
        </svg>
      </button>
    </div>
    <!-- SIDEBAR HEADER -->

    <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
      <!-- Sidebar Menu -->
      <nav class="mt-5 py-4 px-4 lg:mt-0 lg:px-6">
        <RouterLink exact-active-class="bg-graydark dark:bg-meta-4" to="/admin" class="group relative flex items-center gap-2.5 rounded-sm py-3 px-4  font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"> <i class="fa-solid fa-gauge text-white" ></i> <span>Dashboard</span></RouterLink>
        <RouterLink active-class="bg-graydark dark:bg-meta-4" to="/admin/admin-gyms" class="group relative flex items-center gap-2.5 rounded-sm py-3 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"> <i class="fa-solid fa-dumbbell text-white"></i> <span>Members</span></RouterLink>
        <RouterLink active-class="bg-graydark dark:bg-meta-4" to="/admin/admin-users" class="group relative flex items-center gap-2.5 rounded-sm py-3 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"> <i class="fa-solid fa-users text-white"></i> <span>Membership Plans</span></RouterLink>
        <RouterLink active-class="bg-graydark dark:bg-meta-4" to="/admin/admin-transactions" class="group relative flex items-center gap-2.5 rounded-sm py-3 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"> <i class="fa-solid fa-money-check text-white"></i> <span>My Subscription</span></RouterLink>
        <RouterLink active-class="bg-graydark dark:bg-meta-4" to="/admin/admin-plans" class="group relative flex items-center gap-2.5 rounded-sm py-3 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"> <i class="fa-solid fa-money-bill text-white"></i> <span>My Gym</span></RouterLink>
        
        <RouterLink active-class="bg-graydark dark:bg-meta-4" to="/admin/admin-notifications" class="group relative flex items-center gap-2.5 rounded-sm py-3 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"> <i class="fa-solid fa-gauge text-white"></i> <span>Notifications</span></RouterLink>
        
        <RouterLink active-class="bg-graydark dark:bg-meta-4" to="/admin/admin-features" class="group relative flex items-center gap-2.5 rounded-sm py-3 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"> <i class="fa-solid fa-gauge text-white"></i> <span>Workouts & Features</span></RouterLink>
      </nav>
      
    </div>
  </aside>
</template>
