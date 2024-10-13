import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import axios from "axios";
export const useTokenStore = defineStore('token', () => {
    const currentUserToken = ref(null)
    const currentUserDetails = ref(null)
    const decodeToken = async () => {
        try {
            const response = await axios.post('/decode-token')
            console.log(response)
            currentUserToken.value = response.data
            console.log("current user token: ", currentUserToken.value)
        } catch (err) {
            console.log(err)
        }
    }


    const fetchUser = async () => {
        try {
            const response = await axios.post('/decode-token')
            console.log(response)
            currentUserDetails.value = response.data
        } catch (err) {
            console.log(err)
        }
    }


    return { decodeToken, fetchUser, currentUserDetails, currentUserToken }

})