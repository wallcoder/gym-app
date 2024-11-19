import { defineStore, storeToRefs } from "pinia";
import { ref, onMounted, watch, resolveDynamicComponent, } from "vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter } from "vue-router";
import { onClickOutside } from '@vueuse/core';
import axios from "axios";
import { useGymStore } from '@/stores/gyms'
import { useNotifStore } from "@/stores/notif";

export const useAdminStore = defineStore('admin', () => {
    const notif = useNotifStore()
    const { createNotif } = notif
    const gymStore = useGymStore()
    const { getAllGyms } = gymStore;
    const modal = ref(null)
    const receiverId = ref(null)
    const isOpen = ref({
        gymDetails: false,
        deleteGym: false,

        userDetails: false,
        messageUser: false,
        deleteUser: false,

        addPlan: false,
        deletePlan: false,

        addWorkout: false,
        addFeature: false,


    })

    const selectedGym = ref({})
    const activateGymDetails = async (gym, ownerId) => {
        console.log(gym)
        selectedGym.value = gym;
        isOpen.value.gymDetails = true
        receiverId.value = ownerId;

    }
    const setGymVerified = async (gymId, ownerId, planMapId) => {
        try {
            console.log("verif: ", gymId);
            const response = await axios.post('/admin/gym/set-verified', { gymId })
            closeModals();

            toast.success("Gym has been verified", {
                "theme": "dark",
                "position": "bottom-center"
            });
            await createNotif(ownerId, 'Gym Verification Successful', 'Pay subscription fee to activate your plan', `/plan/recharge/${planMapId}`, 'Make payment')
            getAllGyms()
        } catch (err) {
            console.log(err)
        }

    }

    const closeModals = () => {

        isOpen.value = {
            gymDetails: false,
            deleteGym: false,

            userDetails: false,
            messageUser: false,
            deleteUser: false,

            addPlan: false,
            deletePlan: false,

            addWorkout: false,
            addFeature: false,


        };
        receiverId.value = ''
    }

    return { receiverId, setGymVerified, activateGymDetails, isOpen, closeModals, modal, selectedGym }
})