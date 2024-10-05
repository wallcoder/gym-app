<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router'
import NavbarPrimary from '../../components/Navbars/NavbarPrimary.vue'
import Footer from '../../components/Footer.vue'



</script>

<template>
    <section>
        <NavbarPrimary />
        
        <RouterView />
        <Footer />
    </section>
</template>

<style scoped></style>
