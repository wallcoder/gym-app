<script setup>
import { ref } from 'vue';
import Hero from '../../components/Hero.vue'
import Services from '../../components/Services.vue'
</script>
<template>
    <Hero/>
    <Services />
</template>
<style scoped>
.hero {
    background: url(../../assets/images/wallpaper1.png);
    background-size: cover;

    background-position: 50% 20%;
    background-repeat: no-repeat;

}
</style>