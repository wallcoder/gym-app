<script setup>
const props = defineProps({
    content:{
        type: String,
        required: true
    },
    extraStyle:{
        type: String,
        required: false
    },
    handler:{
        type: Function,
        required: true

    }
})
</script>

<template>
    <button class="p-2 bg-first hover:bg-first-light font-semibold rounded-3xl text-white my-2 px-8 transition-all duration-200 ease-linear" :class="props.extraStyle" @click="handler()">{{ props.content }}</button>
</template>