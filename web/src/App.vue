<script setup lang="ts">
import { RouterView } from 'vue-router'
import {onMounted} from 'vue'
import {storeToRefs} from 'pinia'
import {useHomeStore} from './stores/home'
import axios from 'axios'
const home = useHomeStore()
const {isLogin} = storeToRefs(home)

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    isLogin.value = true;
 
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
  }
});
</script>

<template>
  <RouterView />
</template>
