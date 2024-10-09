import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const usePlanStore = defineStore('plans', ()=>{
    const subscriptionPlans = ref([])
    const getSubscriptionPlans = async ()=>{
        try{
            const response = await axios.get('/subscription-plans');
            subscriptionPlans.value = response.data
            console.log(subscriptionPlans.value)
            
        }catch(err){
            console.log(err)

        }
    }

    return{subscriptionPlans, getSubscriptionPlans}
})