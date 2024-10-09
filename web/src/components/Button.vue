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
        required: false,
        
        default: ()=>{}

    },
    disable:{
        type: Boolean,
        required: false,
        default: false
    },
    
    buttonType:{
        type: String,
        required: false,
        default: 'Button'
    }
})
</script>

<template>
    <button :disabled="disable" :type="buttonType"  class="p-2 bg-first hover:bg-first-light font-semibold rounded-3xl text-white my-2 px-8 transition-all duration-200 ease-linear" :class="props.extraStyle" @click="handler()">{{ props.content }}</button>
</template>