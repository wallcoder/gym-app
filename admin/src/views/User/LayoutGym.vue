<script setup>
import { ref, onMounted, } from 'vue'
import { RouterView } from 'vue-router'
import NavbarSecond from '@/components/Navbars/NavbarSecond.vue'

</script>
<template>
    <section class="bg-white">
        <NavbarSecond />
        <RouterView />
    </section>
</template>