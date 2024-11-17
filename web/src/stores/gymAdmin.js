import { defineStore, storeToRefs } from "pinia";
import { ref, onMounted, watch, resolveDynamicComponent, } from "vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter } from "vue-router";
import { onClickOutside } from '@vueuse/core';
import axios from "axios";
import { useGymStore } from '@/stores/gyms'
import { useNotifStore } from "@/stores/notif";



export const useGymAdminStore = defineStore('gymAdmin', () => {
    const router = useRouter()
    const gymIdRef = ref(null)
    const myGym = ref([])
    const myGymFeatures = ref([])
    const myGymWorkouts = ref([])
    const isOpenGallery = ref(false)
    const gymImages = ref([])
    const pp = ref([])
    const modal = ref(null)
    const currentImageId = ref(null)
    const ownerIdRef = ref(null)
    const isOpenAddPlan = ref(false)
    const count = ref({
        profits: null,
        membershipPlans: null,
        activeMembers: null
    })
    const message = ref({
        gymImages: '',
        pp: ''
    })
    const phone = ref('')
    const email = ref('')
    const items = ref({
        allItems: "",
        totalItems: null,
        totalPages: null,
        currentPage: null,
        search: ''

    })

    const plan = ref({
        title: '',
        description: '',
        price: null,
        version: null

    })

    const membershipPlans = ref({
        allItems: "",
        totalItems: null,
        totalPages: null,
        currentPage: null,
        search: ''

    })

    const transactions = ref({
        allItems: "",
        totalItems: null,
        totalPages: null,
        currentPage: null,
        search: ''

    })


    const closeModals = () => {
        isOpenGallery.value = false
        isOpenAddPlan.value = false
    }

    const getAllGymMembers = async (gymId, term = '', page = 1, limit = '4') => {
        try {
            const response = await axios.get(`/gym-admin/members/${gymId}?page=${page}&term=${term}&limit=${limit}`)

            items.value.allItems = response.data.allItems;
            items.value.totalItems = response.data.totalItems;
            items.value.totalPages = response.data.totalPages;
            items.value.currentPage = response.data.currentPage;




            console.log("gym members: ", response.data)

        } catch (err) {
            console.log(err)
        }
    }

    const getMemberships = async (gymId, term = '', page = 1, limit = '4') => {
        try {
            const response = await axios.get(`/gym-admin/memberships/${gymId}?page=${page}&term=${term}&limit=${limit}`)

            membershipPlans.value.allItems = response.data.allItems;
            membershipPlans.value.totalItems = response.data.totalItems;
            membershipPlans.value.totalPages = response.data.totalPages;
            membershipPlans.value.currentPage = response.data.currentPage;




            console.log("gym membersips: ", response.data)

        } catch (err) {
            console.log(err)
        }
    }

    const getTransactions = async (gymId, term = '', page = 1, limit = '4') => {
        try {

            const response = await axios.get(`/gym-admin/transactions/${gymId}?page=${page}&term=${term}&limit=${limit}`)

            transactions.value.allItems = response.data.allItems;
            transactions.value.totalItems = response.data.totalItems;
            transactions.value.totalPages = response.data.totalPages;
            transactions.value.currentPage = response.data.currentPage;




            console.log("gym transactions: ", transactions.value)

        } catch (err) {
            console.log(err)
        }
    }


    const findGym = async (gymId, ownerId) => {
        try {
            console.log("from findGym: ", gymId, ownerId)
            const response = await axios.get(`/gym-admin/gym/${gymId}/${ownerId}`)


            if (response.data.found) {
                gymIdRef.value = response.data.gymId
                myGym.value = response.data.myGym
                email.value = myGym.value.gymEmail
                phone.value = myGym.value.gymPhone
                console.log("GYMM IDDD: ", gymIdRef.value)
                console.log("GYMM: ", myGym.value)


            } else {

                console.log("GYM NOT FOUND")
                router.push('/')
            }

        } catch (err) {
            console.log(err)
        }
    }

    const getMyGymFeatures = async (gymId) => {
        try {
            const response = await axios.get(`/gym-admin/features/${gymId}`)
            myGymFeatures.value = response.data
            console.log("mygymfeatures: ", myGymFeatures.value)
        } catch (err) {
            console.log(err)
        }
    }

    const getMyGymWorkouts = async (gymId) => {
        try {
            const response = await axios.get(`/gym-admin/workouts/${gymId}`)
            myGymWorkouts.value = response.data
            console.log("mygymworkoutes: ", myGymWorkouts.value)
        } catch (err) {
            console.log(err)
        }
    }

    const addGymImage = async (event) => {
        try {

            const formDataToSend = new FormData();
            const files = event.target.files;
            message.value.gymImages = '';

            const validFiles = Array.from(files).filter(file => {
                const isValidType = ['image/jpeg', 'image/png'].includes(file.type);
                if (!isValidType) {
                    message.value.gymImages = `Invalid file type: ${file.name}. Only JPG and PNG files are allowed.`;
                }
                return isValidType;
            });

            if (validFiles.length > 0) {

                gymImages.value = validFiles;
                gymImages.value.forEach((image) => {
                    formDataToSend.append('gymImages', image);
                });
                formDataToSend.append('gymId', gymIdRef.value);
                const response = await axios.post('/gym-admin/add-gym', formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }, timeout: 20000
                });
                await findGym(gymIdRef.value, ownerIdRef.value);

                toast.success("Image added", {
                    "theme": "colored",
                    "position": "bottom-center",
                    style: { zIndex: 9999999999 },
                });

            } else {
                gymImages.value = [];
                toast.error("Invalid input", {
                    "theme": "colored",
                    "position": "bottom-center",
                    style: { zIndex: 9999999999 },
                });
            }
        } catch (err) {
            console.log(err)
            toast.error("Error", {
                "theme": "colored",
                "position": "bottom-center",
                style: { zIndex: 999999999 },
            });
        }


    }
    const changePp = async (event, gymId) => {
        try {
            const formDataToSend = new FormData();
            const files = event.target.files;
            message.value.pp = '';
            const validFiles = Array.from(files).filter(file => {
                const isValidType = ['image/jpeg', 'image/png'].includes(file.type);
                if (!isValidType) {
                    message.value.pp = `Invalid file type: ${file.name}. Only JPG and PNG files are allowed.`;
                }
                return isValidType;
            });

            if (validFiles.length > 0) {

                pp.value = validFiles;
                pp.value.forEach((image) => {
                    formDataToSend.append('pp', image);
                });
                formDataToSend.append('gymId', gymId);
                const response = await axios.put(`/gym-admin/edit-profile-pic/${gymId}`, formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }, timeout: 20000
                });
                await findGym(gymIdRef.value, ownerIdRef.value);

                toast.success("Gym Profile Picture changed", {
                    "theme": "colored",
                    "position": "bottom-center",
                    style: { zIndex: 9999999999 },
                });

            } else {
                gymImages.value = [];
                toast.error("Invalid input", {
                    "theme": "colored",
                    "position": "bottom-center",
                    style: { zIndex: 9999999999 },
                });
            }


        } catch (err) {
            console.log(err)
            toast.error("Error occurred ", {
                theme: "colored",
                position: "bottom-center",
                style: { zIndex: 9999999999 },
            });
        }
    }

    const deleteGymImage = async (imageId, gymId) => {
        try {
            // Await the axios delete request
            const response = await axios.delete(`/gym-admin/delete-image/${imageId}/${gymId}`);

            // Refresh the gym data
            await findGym(gymIdRef.value, ownerIdRef.value);

            // Show success toast


            toast.success("1 Image deleted", {
                theme: "colored",
                position: "bottom-center",
                style: { zIndex: 9999999999 },
            });
        } catch (err) {
            // Handle error response
            if (err.response?.status === 500 && err.response?.data?.messageDel) {
                toast.error(err.response.data.messageDel, {
                    theme: "colored",
                    position: "bottom-center",
                    style: { zIndex: 9999999999 },
                });
            } else {
                toast.error("Error occurred while deleting the image", {
                    theme: "colored",
                    position: "bottom-center",
                    style: { zIndex: 9999999999 },
                });
            }

            console.error(err); // Log the error for debugging
        }
    };

    const changeGymInfo = async (gymId) => {
        try {
            const response = await axios.put(`/gym-admin/change-gym-info/${gymId}`, { phone: phone.value, email: email.value })
            findGym(gymIdRef.value, ownerIdRef.value);
            toast.success("Gym edited", {
                theme: "colored",
                position: "bottom-center",
                style: { zIndex: 9999999999 },
            });
        } catch (err) {
            toast.error("Error occurred ", {
                theme: "colored",
                position: "bottom-center",
                style: { zIndex: 9999999999 },
            });

        }
    }

    const updateGymFeature = async (gymFeatureId, gymId) => {
        try {
            const response = await axios.post(`/gym-admin/update-gym-feature/${gymFeatureId}/${gymId}`)
            getMyGymFeatures(gymIdRef.value)
        } catch (err) {
            console.log(err)
        }
    }
    const updateGymWorkout = async (gymWorkoutId, gymId) => {
        try {
            const response = await axios.post(`/gym-admin/update-gym-workout/${gymWorkoutId}/${gymId}`)
            getMyGymWorkouts(gymIdRef.value)
        } catch (err) {
            console.log(err)
        }
    }

    const addMembershipPlan = async (gymId) => {
        try {
            console.log("gymiddd: ", gymId)
            const response = await axios.post(`/gym-admin/add-membership-plan/${gymId}`, {
                planName: plan.value.title,
                planDescription: plan.value.description,
                price: plan.value.price,
                version: plan.value.version

            })
            closeModals()
            getMemberships(gymIdRef.value)
            toast.success("Plan added", {
                theme: "colored",
                position: "bottom-center",
                style: { zIndex: 9999999999 },
            });
        }catch(err){
            console.log(err)
            toast.error("Error occurred ", {
                theme: "colored",
                position: "bottom-center",
                style: { zIndex: 9999999999 },
            });
        }
    }

    const updateMembershipPlan = async(planId) =>{
        try{
            const response = await axios.post(`/gym-admin/update-membership-plan/${planId}`)
        
            getMemberships(gymIdRef.value)
            closeModals()
            
        }catch(err){
            console.log(err)
            toast.error("Error occurred ", {
                theme: "colored",
                position: "bottom-center",
                style: { zIndex: 9999999999 },
            });
        }
    }

    const deleteMembershipPlan = async(planId)=>{
        try{
            const response = await axios.delete(`/gym-admin/delete-membership-plan/${planId}`)
            getMemberships(gymIdRef.value)
            closeModals()
            toast.success("1 Plan Deleted", {
                theme: "colored",
                position: "bottom-center",
                style: { zIndex: 9999999999 },
            });
        }catch(err){
            console.log(err)
            toast.error("Plan alrady used by customers ", {
                theme: "colored",
                position: "bottom-center",
                style: { zIndex: 9999999999 },
            });
        }
    }

    const countData = async(gymId)=>{
        try{
            const response = await axios.get(`/gym-admin/dashboard/${gymId}`)
            count.value.profits = response.data.profits
            count.value.activeMembers = response.data.activeMembers
            count.value.membershipPlans = response.data.membershipPlans

        }catch(err){
            console.log(err)
        }
    }
    function formatAmount(amount=100) {
        amount = Number(amount)
        if (typeof amount !== 'number') {
            throw new Error('Input must be a number');
        }
    
        const suffixes = ['', 'k', 'L', 'Cr']; // Thousand, Lakh, Crore
        let index = 0;
    
        // Divide amount by 1000 for 'k', then by 100 for 'L' and 'Cr'
        while (amount >= 1000 && index < suffixes.length - 1) {
            if (index === 0) {
                amount /= 1000; // Convert to thousand
            } else {
                amount /= 100; // Convert to lakh, crore
            }
            index++;
        }
    
        // Round to one decimal place if needed
        const formattedAmount = amount % 1 === 0 ? amount : amount.toFixed(1);
    
        return `${formattedAmount}${suffixes[index]}`;
    }
    











    return {formatAmount, countData, count, deleteMembershipPlan, addMembershipPlan, updateMembershipPlan, modal, plan, isOpenAddPlan, updateGymFeature, updateGymWorkout, transactions, getTransactions, changeGymInfo, pp, changePp, ownerIdRef, deleteGymImage, message, addGymImage, currentImageId, closeModals, isOpenGallery, phone, email, myGym, membershipPlans, getMyGymWorkouts, getMyGymFeatures, myGymFeatures, myGymWorkouts, gymIdRef, findGym, getAllGymMembers, items, getMemberships }
})