import { storeToRefs, defineStore } from "pinia";
import { ref } from "vue";
import axios from 'axios';
import { useLoaderStore } from '@/stores/loader'

export const useGymStore = defineStore('gym', () => {
    const gyms = ref([])
    const gym = ref(null)
    const loader = useLoaderStore()
    const { isLoadingSquare } = storeToRefs(loader)
    const totalGyms = ref(null)
    const totalPages = ref(null)
    const currentPage = ref(null)
    const searchedGyms = ref([])
    const allGyms = ref([])
    const gymSearch = ref('')

    const getGyms = async () => {

        isLoadingSquare.value = true
        try {
            const response = await axios.get(`/gyms`)
            // `/faqs?page=${page}&term=${term}&limit=4`
            gyms.value = response.data;

            
        } catch (err) {
            console.log(err)
        } finally {
            isLoadingSquare.value = false
        }

    }

    const searchGyms = async (term = '', location ) => {
        console.log("from search gyms: ", term)
        try {
            const response = await axios.get(`/search-gyms?term=${term}&location=${location}`)
            searchedGyms.value = response.data.gyms
            console.log(searchedGyms.value)


        } catch (err) {
            console.log(err)
        }


    }

    const getAllGyms = async(term='', page=1,limit='10')=>{
        try{
            const response = await axios.get(`/admin/gyms?page=${page}&term=${term}&limit=${limit}`)
            allGyms.value = response.data.allGyms;
            totalGyms.value = response.data.totalGyms;
            totalPages.value = response.data.totalPages;
            currentPage.value = response.data.currentPage;

            console.log(response.data)

        }catch(err){
            console.log(err)
        }
    }

    const getGymById = async (id) => {
        isLoadingSquare.value = true
        try {
            
            const response = await axios.get(`/gyms/${id}`)
            gym.value = response.data
            
        } catch (err) {
            console.log(err)
        } finally {
            isLoadingSquare.value = false
        }
    }


    return { gym, gyms, getGymById, getGyms, searchGyms, searchedGyms, currentPage, totalGyms, totalPages, getAllGyms, allGyms, gymSearch }
})