import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { tryOnScopeDispose } from "@vueuse/core";

export const usePlanStore = defineStore('plans', () => {
    const subscriptionPlans = ref([])
    const subPlan = ref([])
    const selectedPlan = ref({})
    const userPlans = ref([])
    const getSubscriptionPlans = async () => {
        try {
            const response = await axios.get('/subscription-plans');
            subscriptionPlans.value = response.data


        } catch (err) {
            console.log(err)

        }
    }

    

    const getPlanById = async(planId)=>{
        try{
            const response = await axios.get(`/plans/${planId}`)
             selectedPlan.value = response.data
        
        }catch (err) {
            console.log(err)
        }
    }
    const getPlanByMap = async(planMapId)=>{
        try{
            console.log("planMap: ", planMapId)
            const response = await axios.get(`/plan-mapping/plan/${planMapId}`)
            selectedPlan.value = response.data
            console.log(selectedPlan.value)
        }catch(err){
            console.log(err)
        }
    }

    const updatePlanMapping = async(planMapId)=>{
        try{
            const response = await axios.post(`/plan-mapping/recharge/${planMapId}`)
        }catch(err){
            console.log(err)
        }
    }
    const getSubscriptionPlanById = async (id) => {
        try {

            const response = await axios.get(`/subscription-plans/${id}`);
            subPlan.value = response.data;


        } catch (err) {
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

    const getUserPlans = async (userId) => {
        try {
            console.log("from getUserplans: ", userId)
            const response = await axios.get(`/user/plans/${userId}`)
            userPlans.value = response.data
            console.log(userPlans.value)
        } catch (err) {
            console.log(err)
        }
    }


    function formatDate(isoDate) {
        const date = new Date(isoDate);
    
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
    }

    return {getPlanByMap,updatePlanMapping,selectedPlan, getPlanById, getUserPlans, userPlans, subscriptionPlans, getSubscriptionPlans, getSubscriptionPlanById, createPlanMapping, formatDate }
})