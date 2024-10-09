import { ref, watch } from "vue";
import { defineStore, storeToRefs } from "pinia";
import axios from "axios";

export const useOtpStore = defineStore('otp', () => {
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
        if (String(newOtpInput).length < 6 ) {
            otpMessage.value = "OTP should be 6 digits"
            isValid.value = false
        }else{
            otpMessage.value = '';
            isValid.value =true
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

    const sendOTP = async (email) => {
        try {
            const response = await axios.post('/send-otp', { email: email });
            console.log(response)
        } catch (err) {
            if (err.status === 400 && err.response) {
                if (err.response.otpMessage) {
                    otpMessage.value = err.response.otpMessage;
                }
            }
        }

    }

    const verifyOTP = async ()=>{
        try{
            const response = await axios.post('/verify-otp', {email: 'validdepix@gmail.com', otp: otpInput.value})
            console.log("verifyOTP triggered")
            console.log(response)

        }catch(err){
            if (err.status === 400 && err.response) {
                if (err.response.otpMessage) {
                    otpMessage.value = err.response.otpMessage;
                }
            }
            

        }
    }

    return { otpInput, timer, timeRemaining, isRunning, formatTime, startTimer, stopTimer, sendOTP, otpMessage, isValid , verifyOTP}
})