<script setup>
import { ref, onMounted } from 'vue';
import Hero from '../../components/Hero.vue'
import Services from '../../components/Services.vue'
import Action from '../../components/Action.vue'
import Mobile from '../../components/Mobile.vue'
import {useGymStore} from '../../stores/gyms'
import {storeToRefs} from 'pinia'
const gymStore = useGymStore();
const {gyms}  = storeToRefs(gymStore)
const {getGyms} = gymStore;


onMounted(async ()=>{
    await getGyms();
})
</script>
<template>
    <Hero/>
    <Services />
    <Action />
    <Mobile />
    
</template>
<style scoped>
.hero {
    background: url(../../assets/images/wallpaper1.png);
    background-size: cover;

    background-position: 50% 20%;
    background-repeat: no-repeat;

}
</style>