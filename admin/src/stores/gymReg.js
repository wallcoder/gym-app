import { defineStore, storeToRefs } from "pinia";
import { ref, reactive, watch, computed } from "vue";
import axios from "axios";
import { useTokenStore } from "./token";
import { useRouter } from "vue-router";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const useGymRegStore = defineStore('useGymReg', () => {
    const token = useTokenStore();
    const router = useRouter()
    const { decodeToken } = token;
    const { currentUserToken } = storeToRefs(token);
    const allFeatures = ref([])
    const allWorkouts = ref([])
    

    const formData = reactive({
        name: '',
        email: '',
        contact: '',
        location: { lat: 0, lng: 0, buildingNo: '', area: '', city: '', landmark: '' },

        ownerName: '',

        gymImages: [],
        gymProfileImage: [],
        gymLicense: [],
        openingHours: {
            morning: { start: '', end: '' },
            evening: { start: '', end: '' }
        },
        membershipPlans: {
            plan1: { title: '', price: null, duration: '', description: '' },
            plan2: { title: '', price: null, duration: '', description: '' },
            plan3: { title: '', price: null, duration: '', description: '' }
        },
        features: [],
        workouts: [],

        publicKey: '',
        secretKey: ''
    });

    const message = ref({
        email: '',
        phone: '',
        gymImages: '',
        gymProfileImage: '',
        gymLicense: '',
    });

    const emailValue = computed(() => formData.email);
    const contactValue = computed(() => formData.contact);

    const toggleFeature = (id) => {
        if (formData.features.includes(id)) {
            formData.features = formData.features.filter(featureId => featureId !== id);
        } else {
            formData.features.push(id);
        }
    };

    const toggleWorkout = (id) => {
        if (formData.workouts.includes(id)) {
            formData.workouts = formData.workouts.filter(workoutId => workoutId !== id);
        } else {
            formData.workouts.push(id);
        }
    };

    const handleGymImages = (event) => {
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
            formData.gymImages = validFiles;
        } else {
            formData.gymImages = [];
        }
    };

    const handleGymProfileImage = (event) => {
        const files = event.target.files;
        message.value.gymProfileImage = '';

        const validFiles = Array.from(files).filter(file => {
            const isValidType = ['image/jpeg', 'image/png'].includes(file.type);
            if (!isValidType) {
                message.value.gymProfileImage = `Invalid file type: ${file.name}. Only JPG and PNG files are allowed.`;
            }
            return isValidType;
        });

        if (validFiles.length > 0) {
            formData.gymProfileImage = validFiles;
        } else {
            formData.gymProfileImage = [];
        }
    };


    const handleGymLicense = (event) => {
        const files = event.target.files;
        message.value.gymLicense = '';
    
        const validFiles = Array.from(files).filter(file => {
            const isValidType = file.type === 'application/pdf';
            if (!isValidType) {
                message.value.gymLicense = `Invalid file type: ${file.name}. Only PDF files are allowed.`;
            }
            return isValidType;
        });
    
        if (validFiles.length > 0) {
            console.log("validddd")
            formData.gymLicense = validFiles;
        } else {
            formData.gymLicense = [];
        }
    };

    const handleRegister = async (planId) => {
        try {
            console.log("from handle register: ", planId)
            await decodeToken();

            const formDataToSend = new FormData();

            // Append gym images without using indexing
            formData.gymImages.forEach((image) => {
                formDataToSend.append('gymImages', image);
            });

            if (formData.gymProfileImage.length > 0) {
                formDataToSend.append('gymProfileImage', formData.gymProfileImage[0]);
            }
            if (formData.gymLicense.length > 0) {
                formDataToSend.append('gymLicense', formData.gymLicense[0]);
            }

            formDataToSend.append('gymData', JSON.stringify({
                name: formData.name,
                email: formData.email,
                contact: formData.contact,

                ownerName: formData.ownerName,

                location: formData.location,
                openingHours: formData.openingHours,
                membershipPlans: formData.membershipPlans,
                features: formData.features,
                workouts: formData.workouts,
                publicKey: formData.publicKey,
                secretKey: formData.secretKey
            }));

            formDataToSend.append('ownerId', currentUserToken.value.userId);
            formDataToSend.append('planId', planId);

            const response = await axios.post('/register-gym', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }, timeout: 20000
            });

            console.log(response.data);
            router.push('/')
            toast.success("Gym Details submitted successfully", {
                "theme": "colored",
                "position": "bottom-center"
            });





        } catch (err) {
            console.log(err);
        }
    };

    const fetchFeatures = async () => {

        try {

            const response = await axios.get(`/features`)


            allFeatures.value = response.data
        } catch (err) {
            console.log(err)
        }




    }


    const fetchWorkouts = async () => {

        try {

            const response = await axios.get(`/workouts`)


            allWorkouts.value = response.data
        } catch (err) {
            console.log(err)
        }




    }

    return {
        formData, handleRegister, handleGymLicense, message, handleGymImages, handleGymProfileImage, toggleFeature, toggleWorkout, fetchFeatures, fetchWorkouts, allFeatures, allWorkouts
    };
});
