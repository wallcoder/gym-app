import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";


export const useLoaderStore= defineStore('loader', ()=>{
    const isLoadingSquare = ref(false);

    return {isLoadingSquare}
})