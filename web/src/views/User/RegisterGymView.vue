
<script setup>
import Hero from '../../components/Hero.vue'
import NavbarSecond from '../../components/Navbars/NavbarSecond.vue'
import { reactive, ref } from 'vue';

const step = ref(1);
const formData = reactive({
    name: '',
    email: '',
    username: '',
    password: ''
});

const nextStep = () => {
    if (step.value < 3) {
        step.value++;
    }
};

const prevStep = () => {
    if (step.value > 1) {
        step.value--;
    }
};

const submitForm = () => {
    console.log('Form submitted:', formData);
    alert('Form submitted! Check the console for data.');
};
</script>
<template>
    <NavbarSecond />
    <section class="relative w-full ">
        <img src="../../assets/images/wallpaper2.jpg" alt="gym-2" class="w-full h-[50vh] object-cover ">
        <div class="bg-white  h-100 rounded-md absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">sdgsd</div>
    </section>
</template>
  
<style scoped>
/* Custom styles (optional) */
</style>
