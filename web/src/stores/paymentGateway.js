import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import axios from "axios";
import axiosRetry from 'axios-retry';
import { usePlanStore } from "./plans";
import { useRouter } from 'vue-router';
/* global Razorpay */
axiosRetry(axios, { retries: 3 });
export const usePaymentGatewayStore = defineStore('paymentGateway', () => {
    const orderId = ref("");
    const testKey = ref("");
    const planStore = usePlanStore();
    const { createPlanMapping } = planStore
    const router = useRouter();


    const fetchTestKey = async (gymId) => {
        try {
            console.log("from fetchTesket: ", gymId)
            const response = await axios.post('/public-key', { gymId })
            testKey.value = response.data.publicKey;
            console.log("Public Key: ", response.data)
        } catch (error) {
            console.error('Error creating order:', error);
        }
    }
    const createOrder = async (amount, currency, receipt, gymId) => {
        try {
            const response = await axios.post('/create-order', {
                amount, currency, receipt, gymId
            }, {
                timeout: 60000, // Increase timeout
            });
            orderId.value = response.data.id;
            console.log('Order created successfully:', response.data);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const storePaymentDetails = async (paymentId, userId, planId, transactionType, amount, status, receiverId = null, details = null, paymentType = null) => {
        try {
            await axios.post('/store-transaction', {
                paymentId,
                userId,
                planId,
                transactionType,
                amount,
                status,
                receiverId,
                details,
                paymentType
            });
            console.log('Payment details stored:', { paymentId, status, details });
        } catch (error) {
            console.error('Error storing payment details:', error);
        }
    };

    const payNow = async (amountValue, gymId, planId, userId='', transactionType, currency = 'INR', receipt = 'receipt#1') => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to home with the query parameter to show login modal
            router.push({ path: '/', query: { showLoginModal: 'true' } });
            return; // Stop further execution since user is not logged in
        }
        console.log("from payNow: ", gymId)
        await createOrder(amountValue, currency, receipt, gymId);
        await fetchTestKey(gymId);
        const options = {
            key: testKey.value,
            amount: amountValue * 100,
            currency,
            name: 'Dash College',
            description: 'Test Transaction',
            order_id: orderId.value,
            handler: async (response) => {
                console.log("Payment successful, handler triggered");
                try {
                    const verificationResponse = await axios.post('/verify-payment', {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    });

                    console.log("PaymentID: ", response.razorpay_payment_id)

                    const paymentDetails = await axios.get(`/payment-details/${response.razorpay_payment_id}`);
                    // const storePaymentDetails = async (paymentId, userId, planId, transactionType,  status, receiverId = null, details = null, paymentType = null) => {
                    const paymentType = paymentDetails.data.method;
                    console.log("Payment method: ", paymentType)

                    alert("Verification SUCCESSFULL")

                    await storePaymentDetails(response.razorpay_payment_id, userId, planId, transactionType, amountValue, 'success', gymId, verificationResponse.data, paymentType);
                    await createPlanMapping(userId, planId)
                } catch (error) {
                    console.error('Error verifying payment:', error);


                    await storePaymentDetails(response.razorpay_payment_id, userId, planId, transactionType, amountValue, 'failure', gymId);

                    alert('Payment verification failed');
                }
            },
            modal: {
                ondismiss: async () => {
                    console.log("Payment modal closed by user.");
                    await storePaymentDetails("", userId, planId, transactionType, amountValue, 'failure', gymId);
                }
            },
            prefill: {
                name: 'John Doe',  // Prefill details if needed
                email: 'john.doe@example.com',
                contact: '9999999999'
            },
            notes: {
                address: 'Razorpay Corporate Office',
            },
            theme: {
                color: '#016dbc',
            },
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
    };


    return { orderId, createOrder, storePaymentDetails, payNow, fetchTestKey };
});
