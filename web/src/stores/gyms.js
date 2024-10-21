import { storeToRefs, defineStore } from "pinia";
import { ref } from "vue";
import axios from 'axios';

export const useGymStore = defineStore('gym', () => {
    const gyms = ref([])
    const gym = ref(null)
    

    const getGyms = async () => {
        try {
            const response = await axios.get('/gyms')
            gyms.value = response.data;
            console.log("GYMS: ", gyms.value)
        } catch (err) {
            console.log(err)
        }

    }

    const getGymById = async (id) => {
        try {
            console.log("heyeheyey")
            const response = await axios.get(`/gyms/${id}`)
            gym.value = response.data
            console.log(gym.value)
        } catch (err) {
            console.log(err)
        }
    }


    return { gym, gyms, getGymById, getGyms }
})