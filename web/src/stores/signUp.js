import { defineStore, storeToRefs } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";
import { useHomeStore } from "./home";

export const useSignUpStore = defineStore('sign-up', () => {

    const home = useHomeStore();
    // const {isOpenSignUp} = storeToRefs(home)
    // const {closeModals} = home;

    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const conPassword = ref('');



    const message = ref({

        email: '',
        conPassword: '',
        password: ''

    })


    watch(email, (newEmail) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (emailRegex.test(newEmail) || newEmail.trim() === '') {
            message.value.email = "";
        } else {
            message.value.email = "enter valid email address";
        }





    })

    watch(password, (newPassword) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;

        if (passwordRegex.test(newPassword) || newPassword.trim() === '') {
            message.value.password = ""
        } else {
            message.value.password = "Password must be at least 8 characters long"
        }

    })

    watch(conPassword, (newConPassword) => {
        if (newConPassword === password.value || newConPassword.trim() === '') {
            message.value.conPassword = ""
        } else {
            message.value.conPassword = "Password not matching"
        }

    })


    const handleRegister = async () => {
        try {
            if (message.value.email || message.value.password || message.value.conPassword) {
                // do nothing
                return;
            } else {



                const response = await axios.post('/register', { firstName: firstName.value, lastName: lastName.value, email: email.value, password: password.value, conPassword: conPassword.value })

                if (response.status === 201) {
                    console.log("yoyoy")
                    home.closeModals();

                }



            }


        } catch (err) {
            if (err.status === 400 && err.response) {
                if (err.response.data.conPasswordMessage) {
                    message.value.conPassword = err.response.data.conPasswordMessage

                }
                else if (err.response.data.passwordMessage) {
                    message.value.password = err.response.data.passwordMessage

                }
                else if (err.response.data.emailMessage) {
                    message.value.email = err.response.data.emailMessage

                }
            }
            console.log("error: ", err)
        }
    }

    return { firstName, lastName, email, password, conPassword, message, handleRegister }



})