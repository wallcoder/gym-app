import { defineStore, storeToRefs } from "pinia";
import { ref, reactive } from "vue";
import axios from "axios";
import { useTokenStore } from "./token";

export const useGymRegStore = defineStore('useGymReg', () => {
    const token = useTokenStore();
    const { decodeToken } = token;
    const { currentUserToken } = storeToRefs(token)

    const formData = reactive({
        name: '',
        email: '',
        contact: '',
        location: { lat: 0, lng: 0 },
        address: ''
    });

    const handleRegister = async () => {

        try {
            const decode = await decodeToken();
            console.log("current token: ", currentUserToken.value)
            const response = await axios.post('/register-gym', {
                name: formData.name, email: formData.email, contact: formData.contact, latitude: formData.location.lat,
                longitude: formData.location.lng, address: formData.address,
                ownerId: currentUserToken.value.userId
            })
            console.log(response.data);


        } catch (err) {
            console.log(err)
        }
    }

    return {
        formData, handleRegister
    }
})