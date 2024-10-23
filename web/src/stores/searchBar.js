import { defineStore } from "pinia";
import { ref, watch} from "vue";
import axios from "axios";


export const useSearchBarStore = defineStore('searchBar', ()=>{
    const isOpenSugg = ref(false)
    const isOpenLoc = ref(false)
    const query  = ref("")

    const toggleSugg = ()=>{
        isOpenSugg.value = !isOpenSugg.value
        isOpenLoc.value = false
    }

    const toggleLoc = ()=>{
        isOpenLoc.value = !isOpenLoc.value
        isOpenSugg.value = false
    }

    watch(query, (newVal)=>{
        if(newVal){
            isOpenSugg.value = true
        }else{
            isOpenSugg.value = false
        }
       
    })
    return{
        isOpenLoc, isOpenSugg, toggleLoc, toggleSugg, query
    }
})
