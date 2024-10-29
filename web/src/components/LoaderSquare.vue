<script setup>
import { storeToRefs } from 'pinia'
import { useLoaderStore } from '@/stores/loader'
const loader = useLoaderStore()
const { isLoadingSquare } = storeToRefs(loader)

</script>
<template>
    <!-- Loading square for squar.red network -->
    <div class="showbox"  >
        <div class="loader">
            <svg class="circular" viewBox="25 25 50 50">

                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
            </svg>
        </div>
    </div>
</template>
<style >
/* Color Variables */
.green {
    color: #008744;
}

.blue {
    color: #0057e7;
}

.red {
    color: #d62d20;
}

.yellow {
    color: #ffa700;
}

.white {
    color: #eee;
}

/* Dimensions */
.width-100 {
    width: 100px;
}

.loader {
    position: relative;
    margin: 0 auto;
    width: 100px;
}

.loader:before {
    content: '';
    display: block;
    padding-top: 100%;
}

.circular {
    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
    }

    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
    }
}

@keyframes color {

    0%,
    100% {
        stroke: #d62d20;
        /* Red */
    }

    40% {
        stroke: #0057e7;
        /* Blue */
    }

    66% {
        stroke: #008744;
        /* Green */
    }

    80%,
    90% {
        stroke: #ffa700;
        /* Yellow */
    }
}

/* Demo-specific */
body {
    background-color: #eee;
}

.showbox {


    padding: 5%;
}
</style>