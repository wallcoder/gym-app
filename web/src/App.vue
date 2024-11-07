<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useHomeStore } from './stores/home'
import {useTokenStore} from '@/stores/token'
import axios from 'axios'


const token = useTokenStore()

const { isError } = storeToRefs(token)
import ServerError from '@/views/User/ServerError.vue'
const home = useHomeStore()
const { isLogin } = storeToRefs(home)

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    isLogin.value = true;

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  }
});
</script>

<template>
  <section>
    <ServerError v-if="isError"/>
    <RouterView v-else/>
  </section>
</template>
