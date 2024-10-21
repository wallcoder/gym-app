import { defineStore, storeToRefs } from "pinia";
import { ref, onMounted, watch, resolveDynamicComponent } from "vue";
import axios from "axios";
import { onClickOutside, tryOnScopeDispose } from '@vueuse/core';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {useTokenStore} from '@/stores/token' 

import { useRouter } from "vue-router";




export const useHomeStore = defineStore('home', () => {
    const router = useRouter()

    const token = useTokenStore();
    const {decodeToken} = token;
    const {currentUserToken} = storeToRefs(token)

    // MODAL
    const modal = ref(null);
    const isOpenLogin = ref(false)
    const isOpenSignUp = ref(false)
    const isOpenRegisterGym = ref(false)
    const isOpenOTP = ref(false)

    // AUTH
    const isLogin = ref(false);
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const verifyEmail = ref('')
    const password = ref('');
    const conPassword = ref('');
    const message = ref({

        email: '',
        conPassword: '',
        password: ''

    })



    const closeModals = (clearEmail = true) => {
        isOpenLogin.value = false
        isOpenSignUp.value = false
        isOpenRegisterGym.value = false
        firstName.value = ''
        lastName.value = ''
        if (clearEmail) {
            email.value = ''
        }

        password.value = ''
        conPassword.value = ''
        otpInput.value = ''
        isOpenOTP.value = false
        message.value = {
            email: '',
            conPassword: '',
            password: ''

        }


    }
        ;



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



    const handleLogin = async () => {
        try {
            // if (message.value.email || message.value.password || message.value.conPassword) {
            //     // do nothing
            //     return;
            // }
            const response = await axios.post('/login', { email: email.value, password: password.value })
            console.log(response)
            const token = response.data.token;
            localStorage.setItem('token', token)
            isLogin.value = true
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            closeModals();
            decodeToken();


        } catch (err) {
            console.log("error: ", err)
            if (err.status === 401 && err.response) {
                if (err.response.data.passwordMessage) {
                    toast.error(err.response.data.passwordMessage, {
                        "theme": "colored",
                        "position": "bottom-center"
                    });

                }
            }
        }
    }

    // Logout function
const handleLogout = () => {
    localStorage.removeItem('token');
    isLogin.value = false;
    router.push('/')
  };


    const handleRegister = async () => {
        try {
            if (message.value.email || message.value.password || message.value.conPassword) {
                // do nothing
                return;
            } else {



                const response = await axios.post('/register', { firstName: firstName.value, lastName: lastName.value, email: email.value, password: password.value, conPassword: conPassword.value })

                if (response.status === 201) {
                    console.log("yoyoy")
                    closeModals(false);

                    isOpenOTP.value = true;
                    sendOTP()
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

    // OTP
    const otpInput = ref(null)
    const otpMessage = ref("");

    const timeRemaining = ref(60); // Start at 60 seconds
    const isRunning = ref(false);
    const isValid = ref(false)
    let timer;

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    watch(otpInput, (newOtpInput) => {
        console.log("heheheh")
        if (String(newOtpInput).length < 6) {
            otpMessage.value = "OTP should be 6 digits"
            isValid.value = false
        } else {
            otpMessage.value = '';
            isValid.value = true
        }

    })
    const startTimer = () => {
        if (isRunning.value) return;
        isRunning.value = true;

        timer = setInterval(() => {
            if (timeRemaining.value > 0) {
                timeRemaining.value--;
            } else {
                clearInterval(timer);
                isRunning.value = false; // Stop the timer when it reaches 0
            }
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(timer);
        isRunning.value = false;
    };

    const sendOTP = async () => {
        try {
            console.log("OPT SENT")
            startTimer()
            const response = await axios.post('/send-otp', { email: email.value });
            console.log(response)
        } catch (err) {
            if (err.status === 400 && err.response) {
                if (err.response.otpMessage) {
                    otpMessage.value = err.response.otpMessage;
                }
            }
        }

    }

    const verifyOTP = async () => {
        try {
            const response = await axios.post('/verify-otp', { email: email.value, otp: otpInput.value });
            console.log("verifyOTP triggered");
            console.log(response);

            closeModals();
            toast.success("Your email is successfully verified", {
                "theme": "colored",
                "position": "bottom-center"
            });

        } catch (err) {
            console.log("error occurred");
            if (err.response && err.response.status === 400) {
                if (err.response.data.otpMessage) {
                    otpMessage.value = err.response.data.otpMessage;
                    toast.error(otpMessage.value, {
                        "theme": "colored",
                        "position": "bottom-center"
                    });
                }
            }
        }
    };




    return {
        modal, isOpenLogin, isOpenRegisterGym, isOpenSignUp, closeModals, isOpenOTP, firstName, lastName, email, password, conPassword, message, handleRegister,
        otpInput, timer, timeRemaining, isRunning, formatTime, startTimer, stopTimer, sendOTP, otpMessage, isValid, verifyOTP, verifyEmail, handleLogin, handleLogout, isLogin
    }

})