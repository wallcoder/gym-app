<script setup>
import { ref } from 'vue';

</script>
<template>
    <section>
        <div class="hero w-full min-h-[400px] flex flex-col justify-center items-center text-white ">
            <h1 class="text-2xl tablet:text-3xl font-semibold text-center"> Unlock Your Fitness Journey – Anytime, Anywhere</h1>
            <div class="bg-white h-10 tablet:w-[600px] smartphone:w-[400px] rounded-lg my-4 flex"><span
                    class="flex justify-center items-center cursor-pointer"><i
                        class="fa-solid fa-magnifying-glass text-lg text-first p-2"></i></span>
                         <input type="text" placeholder="Search Gym or Location" class="text-black p-2 rounded-lg w-[80%] outline-none "> 
                         <span  class="flex  items-center justify-end rounded-lg  text-black  p-2  w-[20%] ">Aizawl<span class=""></span><i
                        class="fa-solid fa-location-dot text-lg text-first p-2 cursor-pointer"></i></span></div>
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