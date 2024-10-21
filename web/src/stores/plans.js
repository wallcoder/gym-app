import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const usePlanStore = defineStore('plans', ()=>{
    const subscriptionPlans = ref([])
    const subPlan = ref([])
    const getSubscriptionPlans = async ()=>{
        try{
            const response = await axios.get('/subscription-plans');
            subscriptionPlans.value = response.data
            console.log(subscriptionPlans.value)
            
        }catch(err){
            console.log(err)

        }
    }

    const getSubscriptionPlanById = async(id)=>{
        try{
            console.log("requeste made")
            const response = await axios.get(`/subscription-plans/${id}`);
            subPlan.value = response.data;
            console.log(subPlan.value);

        }catch(err){
            console.log(err)
        }
    }


    const createPlanMapping = async (userId, planId) => {
        try {
            console.log("from createPlanMapping", userId, planId)
            const response = await axios.post('/insert-plan', { userId, planId })
            console.log(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    return{subscriptionPlans, getSubscriptionPlans, getSubscriptionPlanById, createPlanMapping}
})