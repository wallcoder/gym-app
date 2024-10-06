<script setup>
import { ref } from 'vue';
import Hero from '../../components/Hero.vue'
import Services from '../../components/Services.vue'
import Action from '../../components/Action.vue'
import Mobile from '../../components/Mobile.vue'
import SignUp from '../../components/SignUp.vue'
import Login from '../../components/Login.vue'
import SubscriptionDeals from '../../components/SubscriptionDeals.vue'
</script>
<template>
    <Hero/>
    <Services />
    <Action />
    <Mobile />
    <SignUp />
    <Login />
    <SubscriptionDeals />
</template>
<style scoped>
.hero {
    background: url(../../assets/images/wallpaper1.png);
    background-size: cover;

    background-position: 50% 20%;
    background-repeat: no-repeat;

}
</style>