<script setup>

const props = defineProps({
    notif: {
        type: Array,
        required: true
    }
})

</script>
<template>
    <div class="flex flex-col shadow-3 p-3  min-h-[120px] justify-between  overflow-y-auto " v-for="n in props.notif" :key="n.id">
        <div>
            <h2 class="font-semibold">{{ n.title }}</h2>
            <p>{{ n.message }} </p>
        </div>
        <RouterLink :to="n.link" class="text-first hover:underline cursor-pointer" target="_blank">{{ n.linkContent }}</RouterLink>
    </div>
</template>