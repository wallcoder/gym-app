<script setup>
    import {useHomeStore} from '@/stores/home'
    import {ref, onMounted} from 'vue'
    import {storeToRefs} from 'pinia'

    const home = useHomeStore()
    const {handleLogin} = home
    const {email, password, message} = storeToRefs(home)
    const show = ref(false)


</script>
<template>
    <div class="min-h-screen flex items-center justify-center bg-[#1A222C]">
        <div class="bg-[#24303F] shadow-md rounded-lg p-6 max-w-sm w-full">
            <h1 class="text-2xl font-bold mb-6 text-white text-center">Admin Login</h1>
            <form @submit.prevent="handleLogin(3)">
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-white">Email</label>
                    <input type="email" id="email" v-model="email"
                        class="bg-gray-700 border border-gray-600 text-white  bg-[#1A222C] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                        placeholder="name@example.com" required />
                        <span class="text-red block mt-1 text-sm ">{{ message.email }}</span>
                </div>
                <div class="mb-5">
                    <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
                    <input :type="show? 'text': 'password'" id="password" v-model="password"
                        class="bg-gray-700 border border-gray-600 bg-[#1A222C] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                        required />
                        <span class="text-red block mt-1 text-sm ">{{ message.password }}</span>
                </div>
                <div class="flex items-center justify-between mb-5">
                    <div class="flex items-center">
                        <input id="remember" type="checkbox" @click="()=>{show = !show}"
                            class="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-blue-600" />
                        <label for="remember" class="ms-2 text-sm font-medium text-white">Show password</label>
                    </div>
                   
                </div>

                <button type="submit"
                    class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
                    Login
                </button>
            </form>

        </div>
    </div>
</template>