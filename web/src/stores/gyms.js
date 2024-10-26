import { storeToRefs, defineStore } from "pinia";
import { ref } from "vue";
import axios from 'axios';
import {useLoaderStore} from '@/stores/loader'

export const useGymStore = defineStore('gym', () => {
    const gyms = ref([])
    const gym = ref(null)
    const loader = useLoaderStore()
    const {isLoadingSquare} = storeToRefs(loader)
    

    const getGyms = async () => {
        isLoadingSquare.value = true
        try {
            const response = await axios.get('/gyms')
            gyms.value = response.data;
            console.log("GYMS: ", gyms.value)
        } catch (err) {
            console.log(err)
        }finally{
            isLoadingSquare.value = false
        }

    }

    const getGymById = async (id) => {
        isLoadingSquare.value = true
        try {
            console.log("heyeheyey")
            const response = await axios.get(`/gyms/${id}`)
            gym.value = response.data
            console.log(gym.value)
        } catch (err) {
            console.log(err)
        }finally{
            isLoadingSquare.value = false
        }
    }


    return { gym, gyms, getGymById, getGyms }
})