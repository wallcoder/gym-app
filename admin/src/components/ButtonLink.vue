<script setup>
import {RouterLink} from 'vue-router'
const props = defineProps({
    content:{
        type: String,
        required: true
    },
    extraStyle:{
        type: String,
        required: false
    },
    link:{
        type: String,
        required: false,
        default: "#"

    },
    icon:{
        type: String,
        required: false

    }
})
</script>

<template>
    <RouterLink :to="props.link" class="p-2  font-semibold rounded-3xl  my-2 px-8 transition-all duration-200 ease-linear block text-center" :class="props.extraStyle ? props.extraStyle : 'text-white bg-first hover:bg-first-light'" v-motion-fade-visible-once><span>{{ props.content }}</span> <i :class="props.icon" class="px-2" v-if="props.icon"></i></RouterLink >
</template>