<script setup>
import { RouterLink } from 'vue-router'
import NotifCard from '@/components/NotifCard.vue'
</script>
<template>
    <section>

        <div class="p-2 flex flex-col w-full rounded-lg ">

            <h1 class="text-lg font-semibold text-black">Notifications</h1>
            <NotifCard />
        </div>
    </section>
</template>