import { ref } from "vue";
import { useScroll } from "@vueuse/core";
import { defineStore } from "pinia";


export  const useNavbarStore  =  defineStore('navbar', ()=>{
    const el = ref(null)
    const scroll = useScroll(el)
    return {el, scroll}
})
