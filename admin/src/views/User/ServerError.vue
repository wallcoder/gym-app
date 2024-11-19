<script setup>
import { RouterLink } from 'vue-router'
import { useTokenStore } from '@/stores/token'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const router = useRouter()
const token = useTokenStore()

const { isError } = storeToRefs(token)

</script>
<template>
    <div class="h-screen w-screen bg-gray-50 flex items-center" v-if="isError">
        <div class="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
            <div class="w-full lg:w-1/2 mx-8">
                <div class="text-7xl text-first font-dark font-extrabold mb-8"> 500</div>
                <p class="text-2xl md:text-3xl font-light leading-normal mb-8">
                    Internal Server Error
                </p>

                <div @click="() => {
                    window.location.reload();
                }" class="cursor-pointer text-white bg-first hover:bg-first-light p-2  font-semibold rounded-3xl  my-2 px-8 transition-all duration-200 ease-linear inlinetext-center capitalize inline">
                    go back</div>
            </div>
            <div class="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
                <img src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
                    class="" alt="Page not found">
            </div>

        </div>
    </div>
</template>