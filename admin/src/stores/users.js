import { defineStore, storeToRefs } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";
import { useHomeStore } from "./home";


export const useUserStore = defineStore('users', () => {
    const allItems = ref([]);
    const totalItems = ref(null)
    const totalPages = ref(null)
    const currentPage = ref(null)

   
    const search = ref('');

    const gymMembers = ref({
        allItems: "",
        totalItems: null,
        totalPages: null,
        currentPage: null,
        search: ''

    })
    const getAllGymMembers = async (gymId, term = '', page = 1, limit = '4') => {
        try {
            const response = await axios.get(`/gym-admin/members/${gymId}?page=${page}&term=${term}&limit=${limit}`)

            gymMembers.value.allItems = response.data.allItems;
            gymMembers.value.totalItems = response.data.totalItems;
            gymMembers.value.totalPages = response.data.totalPages;
            gymMembers.value.currentPage = response.data.currentPage;




            console.log("gym members: ", response.data)

        } catch (err) {
            console.log(err)
        }
    }

    const getAllUsers = async (term = '', page = 1, limit = '4') => {
        try {
            const response = await axios.get(`/admin/users?page=${page}&term=${term}&limit=${limit}`)
            allItems.value = response.data.allItems;
            totalItems.value = response.data.totalItems;
            totalPages.value = response.data.totalPages;
            currentPage.value = response.data.currentPage;

            console.log(response.data)

        } catch (err) {
            console.log(err)
        }
    }



    return { allItems, search, totalItems, totalPages, currentPage, getAllUsers, getAllGymMembers, gymMembers }
})