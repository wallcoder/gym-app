<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router'
import NavbarPrimary from '../../components/Navbars/NavbarPrimary.vue'
import Footer from '../../components/Footer.vue'
import { useScroll } from '@vueuse/core'

const bodyEl = ref(null);
const scroll = ref(null);

onMounted(() => {
    bodyEl.value = document.body; // Reference the body element
    scroll.value = useScroll(bodyEl); // Use useScroll to track the body element
});
</script>

<template>
    <section>
        <NavbarPrimary />
      
        <RouterView />
        <Footer />
    </section>
</template>

<style scoped></style>
