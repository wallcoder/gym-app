import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useSignUpStore = defineStore('sign-up', () => {

    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const conPassword = ref('');

    const message = ref({

        email: '',
        conPassword: ''

    })


    const handleRegister = async () => {
        try {
            const response = await axios.post('/register', { firstName: firstName.value, lastName: lastName.value, email: email.value, password: password.value, conPassword: conPassword.value })
            if(response.data.conPasswordMessage){
                message.value.conPassword = response.data.conPasswordMessage
                
            }
            
        
        } catch (err) {
            console.log("error: ", err)
        }
    }

    return {firstName, lastName, email, password, conPassword, message, handleRegister }



})