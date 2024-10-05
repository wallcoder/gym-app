import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { onClickOutside } from '@vueuse/core';

export const useHomeStore = defineStore('home',()=>{
    const modal = ref(null);
    const isOpenLogin = ref(false)
    const isOpenSignUp = ref(false)
    const isOpenRegisterGym = ref(false)


    const closeModals = ()=>{
        isOpenLogin.value = false
        isOpenSignUp.value = false
        isOpenRegisterGym.value = false

    
    }
    ;


    

    return {modal, isOpenLogin, isOpenRegisterGym, isOpenSignUp, closeModals}

})