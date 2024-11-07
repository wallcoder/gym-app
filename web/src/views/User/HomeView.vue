<script setup>
import { ref, onMounted, watch } from 'vue';
import Hero from '../../components/Hero.vue'
import Services from '../../components/Services.vue'
import Action from '../../components/Action.vue'
import Mobile from '../../components/Mobile.vue'

import { useGymStore } from '../../stores/gyms'
import { useHomeStore } from '../../stores/home'
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia'
const route = useRoute();
const home = useHomeStore()

const gymStore = useGymStore();
const { gyms } = storeToRefs(gymStore)
const { getGyms } = gymStore;
const { isOpenLogin } = storeToRefs(home)
watch(
    () => route.query.showLoginModal,
    (newVal) => {
        if (newVal === 'true') {
            isOpenLogin.value = true;
        }
    }
);

onMounted(async () => {
    await getGyms();
    if (route.query.showLoginModal === 'true') {
        isOpenLogin.value = true;
    }
});


</script>
<template>
    <section class="bg-white">
        <Hero />
        <Services />
        <Action />
        <Mobile />
    </section>
</template>
<style scoped>
.hero {
    background: url(../../assets/images/wallpaper1.webp);
    background-size: cover;

    background-position: 50% 20%;
    background-repeat: no-repeat;

}
</style>