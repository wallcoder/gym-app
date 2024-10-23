import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import axios from "axios";
export const useTokenStore = defineStore('token', () => {

    const componentKey = ref(0);

    const forceRerender = () => {
      componentKey.value += 1;
    };
    const currentUserToken = ref(null)
    const currentUserDetails = ref(null)
    const decodeToken = async () => {
        try {
          const response = await axios.post('/decode-token');
          console.log(response);
          currentUserToken.value = response.data;
      
          // Ensure it's a stringified object when setting in localStorage
          localStorage.setItem('user', JSON.stringify(currentUserToken.value));
      
          console.log('current user token:', currentUserToken.value);
        } catch (err) {
          console.log(err);
        }
      };
      


    const fetchUser = async () => {
        try {
            const response = await axios.post('/decode-token')
            console.log(response)
            currentUserDetails.value = response.data
        } catch (err) {
            console.log(err)
        }
    }


    return { decodeToken, fetchUser, currentUserDetails, currentUserToken, componentKey, forceRerender }

})