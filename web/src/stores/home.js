import { defineStore, storeToRefs } from "pinia";
import { ref, onMounted, watch, resolveDynamicComponent } from "vue";
import axios from "axios";
import { onClickOutside, tryOnScopeDispose } from '@vueuse/core';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useTokenStore } from '@/stores/token'
import { decodeCredential } from 'vue3-google-login'
import { useRouter } from "vue-router";
import { useGymStore } from '@/stores/gyms'


export const useHomeStore = defineStore('home', () => {
    const gymStore = useGymStore();
    const { userSavedGyms } = storeToRefs(gymStore)
    const { getSavedGyms } = gymStore;



    const router = useRouter()
    const isOpenRate = ref(false)
    const token = useTokenStore();
    const { decodeToken, forceRerender } = token;
    const { currentUserToken } = storeToRefs(token)
    const currentUser = ref(null);  // Declare currentUser as a ref
    // MODAL
    const modal = ref(null);
    const isOpenLogin = ref(false)
    const isOpenSignUp = ref(false)
    const isOpenRegisterGym = ref(false)
    const isOpenOTP = ref(false)
    const isOpenEditProfile = ref(false)
    const savedGyms = ref([])
    const isOpenChangePassword = ref(false)
    const isOpenDeleteAccount = ref(false)

    // AUTH
    const isLogin = ref(false);
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const verifyEmail = ref('')
    const password = ref('');
    const conPassword = ref('');
    const emailId = ref('')
    const currPassword = ref('');
    const adminEmail = ref('');
    const adminPassword = ref('');
    const message = ref({

        email: '',
        conPassword: '',
        password: ''

    })

    const closeOtp = async (delUser = false) => {
        console.log("closed")
        isOpenOTP.value = false
        if (delUser) {
            await delUserByEmail(emailId.value)
        }
        emailId.value = '';
        password.value = ''
        password.value = ''
    }

    const closeModals = (clearEmail = true, clearPassword = true) => {
        isOpenLogin.value = false
        isOpenSignUp.value = false
        isOpenRegisterGym.value = false
        firstName.value = ''
        lastName.value = ''
        isOpenEditProfile.value = false
        isOpenChangePassword.value = false
        isOpenDeleteAccount.value = false
        isOpenRate.value = false
        adminEmail.value = false
        adminPassword.value = false
        currPassword.value = ''
        if (clearEmail) {
            email.value = ''
        }
        if (clearPassword) {
            password.value = ''
        }

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



    const handleSave = async (gymId) => {
        try {
            console.log("handleSave: ", gymId)
            if (currentUser.value) {
                const userId = currentUser.value.userId
                const response = await axios.post('/save-gym', { gymId, userId });
                console.log(response.data);

                await getSaved(currentUser.value.userId)
                await getSavedGyms(currentUser.value.userId)
                if (response.data.message == 'saved') {
                    toast.success("Gym has been saved", {
                        "theme": "colored",
                        "position": "bottom-center"
                    });
                }
            } else {
                isOpenLogin.value = true
            }

        } catch (err) {

            console.log(err)

        }
    }

    const getSaved = async (userId) => {
        try {
            console.log("getSaved: ", userId)
            const response = await axios.get(`/user-saved/${userId}`)
            savedGyms.value = response.data.map(item => item.gymId)
            console.log("saved gyms: ", savedGyms.value)

        } catch (err) {
            console.log(err)
        }
    }
    const delUserByEmail = async (email) => {
        try {
            const response = await axios.delete(`/user/${email}`)
            console.log(response.data)

        } catch (err) {
            console.log(err)
        }
    }

    const callback = async (response) => {
        console.log("Google login response", response)

        let profile = decodeCredential(response.credential)

        // save user profile
        try {
            const response = await axios.post('/api/auth/google', { profile })

            const token = response.data.token
            console.log("tokennn: ", token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            localStorage.setItem('token', token);
            const userData = await decodeToken(token);
            currentUser.value = userData;
            localStorage.setItem('user', JSON.stringify(userData));

            console.log("User Data after Login:", currentUser.value);
            isLogin.value = true
            closeModals(true, true)



        } catch (err) {
            console.log(err)
        }
        // localStorage.setItem('user', JSON.stringify(profile))







    }


    

    const handleLogin = async () => {
        try {
            console.log(email.value, password.value);
            const response = await axios.post('/login', { email: email.value, password: password.value });
            const token = response.data.token;

            // Store the token in localStorage
            localStorage.setItem('token', token);

            // Set the login state and configure axios authorization header
            isLogin.value = true;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Decode the token to get user data (adjust based on your decodeToken logic)
            const userData = await decodeToken(token); // Assuming this returns user data like { firstName, ... }


            currentUser.value = userData;
            localStorage.setItem('user', JSON.stringify(userData));


            console.log("User Data after Login:", currentUser.value);


            closeModals();
            forceRerender();








        } catch (err) {
            console.log("error: ", err);
            if (err.response && err.response.status === 401) {
                if (err.response.data.passwordMessage) {
                    toast.error(err.response.data.passwordMessage, {
                        theme: "colored",
                        position: "bottom-center"
                    });
                }
            }
        }
    };


    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        isLogin.value = false;
        currentUser.value = false;
        router.push('/')
    };


    const handleRegister = async () => {
        try {
            if (message.value.email || message.value.password || message.value.conPassword) {
                // do nothing
                return;
            } else {

                emailId.value = email.value;

                const response = await axios.post('/register', { firstName: firstName.value, lastName: lastName.value, email: email.value, password: password.value, conPassword: conPassword.value })

                if (response.status === 201) {

                    closeModals(false, false);

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

            startTimer()
            const response = await axios.post('/send-otp', { email: email.value });

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




            await handleLogin()
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
        isOpenRate, currPassword, isOpenChangePassword, isOpenDeleteAccount, callback, closeOtp, modal, delUserByEmail, isOpenLogin, isOpenRegisterGym, isOpenSignUp, closeModals, isOpenOTP, firstName, lastName, email, password, conPassword, message, handleRegister, handleSave, getSaved, savedGyms,
        otpInput, timer, timeRemaining, isRunning, formatTime, startTimer, stopTimer, sendOTP, otpMessage, isValid, verifyOTP, verifyEmail, handleLogin, handleLogout, isLogin, currentUser, isOpenEditProfile
    }

})