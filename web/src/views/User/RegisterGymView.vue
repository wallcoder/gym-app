
<script setup>
import Hero from '../../components/Hero.vue'
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
    <section class="w-full h-[100vh]">
        <Hero />
    </section>
</template>
  
<style scoped>
/* Custom styles (optional) */
</style>
