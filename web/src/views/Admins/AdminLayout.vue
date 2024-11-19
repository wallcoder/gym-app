<script setup>
import { RouterView } from 'vue-router'
import HeaderArea from '@/components/Header/HeaderArea.vue'
import SidebarArea from '@/components/Sidebar/SidebarArea.vue'
</script>
<template>
  <div class="flex h-screen overflow-hidden">
    <!-- ===== Sidebar Start ===== -->
     

    <SidebarArea />
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