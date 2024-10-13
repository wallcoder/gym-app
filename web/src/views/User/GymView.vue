<script setup>
import NavbarSecond from '../../components/Navbars/NavbarSecond.vue';
import Footer from '../../components/Footer.vue';
import { RouterLink } from 'vue-router'


</script>

<template>
    <section>
        <NavbarSecond />
        <div class=" px-3 tablet:px-[12%] flex flex-col pt-2 pb-30">
            <div class="py-4">
                <img src="../../assets/images/wallpaper2.jpg" alt="gym" class="w-full rounded-lg h-[50vh] object-cover">
            </div>
            <h1 class="text-2xl font-semibold text-black mb-2">Lotus Gym</h1>
            <div class="flex flex-col tablet:flex-row tablet:justify-between  ">
                <div class="flex flex-col ">
                    <span class="flex items-center space-x-1">
                        <i class="fa-solid fa-star text-lg text-yellow-500"></i>
                        <span>4.2</span>
                    </span>
                    <span class="flex items-center space-x-1">
                        <i class="fa-solid fa-location-dot text-lg text-first"></i>
                        <span>Divided States of America</span>
                    </span>
                </div>
                <div
                    class="flex flex-col bg-third p-3 rounded-xl font-semibold text-black my-3 tablet:my-0 tablet:w-[350px]">
                    <h1 class="text-xl mb-1">Contact Us</h1>
                    <h1>Phone: <span class="font-medium">2142142112432</span></h1>
                    <h1>Email: <span class="font-medium">sdgd@sdgsd</span></h1>

                </div>

            </div>
            <div class="flex flex-col ">
                <h1 class="text-2xl font-semibold text-black mb-2">Opening Hours</h1>
                <div class="flex space-x-2">
                    <div
                        class="flex flex-col bg-third p-3 rounded-xl font-semibold text-black my-3 tablet:my-0 tablet:w-[200px]">
                        <h1>Morning</h1>
                        <h1 class="text-sm ">6:00am - 10:00am</h1>

                    </div>
                    <div
                        class="flex flex-col bg-third p-3 rounded-xl font-semibold text-black my-3 tablet:my-0 tablet:w-[200px]">
                        <h1>Evening</h1>
                        <h1 class="text-sm ">7:00pm - 10:00pm</h1>

                    </div>
                </div>
            </div>
            <div class="flex flex-col mt-[20px]">
                <h1 class="text-2xl font-semibold text-black mb-2">Membership Plans</h1>
                <div class="flex space-y-2">
                    <div
                        class="flex flex-col bg-white shadow-4 p-3 rounded-xl font-semibold  h-[120px] my-3 tablet:my-0 tablet:w-[300px] w-full space-y-1 justify-between">
                        <span>
                            <h1 class="text-black">Monthly Plan</h1>
                            <h1 class="text-sm text-">Rs 700/month</h1>
                        </span>
                        <RouterLink to="#" class="hover:underline text-first">Get Membership</RouterLink>

                    </div>

                </div>
            </div>
            <div class="flex flex-col mt-[20px]">
                <h1 class="text-2xl font-semibold text-black mb-2">Features</h1>
                <div class="flex  space-x-4">
                    <div class="flex flex-col items-center justify-center">
                        <img src="" alt="features" class="bg-first w-16 h-16 rounded-full" >
                        <span class="text-black text-sm">AC</span>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <img src="" alt="features" class="bg-first w-16 h-16 rounded-full" >
                        <span class="text-black text-sm">AC</span>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <img src="" alt="features" class="bg-first w-16 h-16 rounded-full" >
                        <span class="text-black text-sm">AC</span>
                    </div>


                </div>
            </div>
            <div class="flex flex-col mt-[20px]">
                <h1 class="text-2xl font-semibold text-black mb-2">Workouts Available</h1>
                <div class="flex  space-x-4">
                    <span class="bg-third py-2 px-4 rounded-2xl text-black font-medium">Weight Training</span>
                    <span class="bg-third py-2 px-4 rounded-2xl text-black font-medium">Athletics</span>
                    <span class="bg-third py-2 px-4 rounded-2xl text-black font-medium">Boxing</span>
                  
                    

                </div>
            </div>
            <div class="flex flex-col mt-[20px]">
                <h1 class="text-2xl font-semibold text-black mb-2">Rules</h1>
                <ul class="list-disc ml-3 text-black">
                    <li>no ase lkhkjgkjgsdgsdgsdgsd</li>
                    <li>sdgsdgsdgsdgsd</li>
                    
                </ul>
            </div>
        </div>
        <Footer />
    </section>
</template>