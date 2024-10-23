<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router'
import NavbarPrimary from '../../components/Navbars/NavbarPrimary.vue'
import Footer from '../../components/Footer.vue'
import SignUp from '../../components/SignUp.vue'
import Login from '../../components/Login.vue'
import SubscriptionDeals from '../../components/SubscriptionDeals.vue'
import OTP from '../../components/OTP.vue'
import {useTokenStore} from '@/stores/token'
import {storeToRefs} from 'pinia'

const token = useTokenStore()
const {componentKey} = storeToRefs(token)




</script>

<template>
    <section>
        <NavbarPrimary :key="componentKey"/>

        <RouterView />
        <SignUp />
        <Login />
        <SubscriptionDeals />
        <OTP />
        <Footer />
    </section>
</template>

<style scoped></style>
