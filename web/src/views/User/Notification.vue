<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import NotifCard from '@/components/NotifCard.vue'
import { useNotifStore } from '@/stores/notif'
import { useHomeStore } from '@/stores/home'

const home = useHomeStore()
const { currentUser } = storeToRefs(home)

const notifStore = useNotifStore();
const { notif } = storeToRefs(notifStore)
const { getNotif, delNotif } = notifStore

onMounted(() => {
    if (currentUser.value) {
       

        getNotif(currentUser.value.userId)
    }


})

</script>
<template>
    <section>

        <div class="p-2 flex flex-col w-full rounded-lg ">

            <h1 class="text-lg font-semibold text-black">Notifications</h1>
            <NotifCard :notif="notif" />
        </div>
    </section>
</template>