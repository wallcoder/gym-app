<script setup>
const props = defineProps({
    content: {
        type: String,
        required: true
    },
    extraStyle: {
        type: String,
        required: false
    },
    handler: {
        type: Function,
        required: false,

        default: () => { }

    },
    disable: {
        type: Boolean,
        required: false,
        default: false
    },

    buttonType: {
        type: String,
        required: false,
        default: 'Button'
    }
})
</script>

<template>
    <button :disabled="disable" :type="buttonType" v-motion-fade-visible-once :class="[
        'p-2 font-semibold rounded-3xl my-2 px-8 transition-all duration-200 ease-linear',
        disable ? 'bg-gray text- cursor-not-allowed' : 'bg-first hover:bg-first-light text-white',
        extraStyle
    ]" @click="handler">
        {{ content }}
    </button>
</template>
