<script setup>
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import NotifCard from '@/components/NotifCard.vue'
import { storeToRefs } from 'pinia'

import { usePlanStore } from '@/stores/plans'
import { useHomeStore } from '@/stores/home'
const home = useHomeStore()
const { currentUser } = storeToRefs(home)
const plan = usePlanStore()
const { getUserPlans, formatDate } = plan
const { userPlans } = storeToRefs(plan)
onMounted(async () => {
    if (currentUser.value) {


        await getUserPlans(currentUser.value.userId)
    }
})

</script>
<template>
    <section>

        <div class="p-2 flex flex-col w-full rounded-lg height-full">

            <h1 class="text-lg font-semibold text-black">No Memberships</h1>
            <div class="w-full h-70 flex justify-center items-center font-semibold text-sixth text-3xl  " v-if="userPlans.length === 0">No Membership Plans</div>
            <div class="flex space-x-2 p-4 shadow-3 rounded-lg text-sm " v-for="p in userPlans" :key="p.id" v-else>
                <div class="flex flex-col justify-center">
                    <h2 class="font-semibold ">Lotus Gym</h2>
                    <h2 class="mb-2">Card No: {{ p.id }}</h2>
                    <h2>Name: {{ currentUser.firstName }} {{ currentUser.lastName }}</h2>
                    <h2 class="mb-2">Expiry Date: {{ formatDate(p.expireDate) }}</h2>
                    <h2>Status: <span class=" font-semibold uppercase"
                            :class="p.status == 'active' ? 'text-first' : 'text-red-200'">{{ p.status }}</span></h2>
                        <h2 class="text-first hover:underline font-semibold" v-if="p.status == 'inactive'">Renew Membership</h2>
                </div>
                <img :src="p.qrCode" alt="" class="w-30 h-30 tablet:w-40 tablet:h-40">
            </div>
        </div>
    </section>
</template>