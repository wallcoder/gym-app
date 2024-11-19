<script setup>
import { ref } from 'vue';
import SearchBar from '@/components/searchBar.vue'

</script>
<template>
    <section v-motion-fade-visible-once>
        <div class="hero w-full min-h-[400px] flex flex-col relative  items-center text-white ">
            <h1 class="text-2xl tablet:text-3xl font-semibold text-center mt-35 mb-2"> Unlock Your Fitness Journey – Anytime,
                Anywhere
            </h1>
            <SearchBar />
            
        </div>

    </section>
</template>
<style scoped>
.hero {
    background: url(../assets/images/wallpaper1.png);
    background-size: cover;

    background-position: 50% 20%;
    background-repeat: no-repeat;

}
</style>