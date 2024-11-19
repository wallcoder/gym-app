<script setup>
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { usePlanStore } from '@/stores/plans'
import { useHomeStore } from '@/stores/home'
import Button from '@/components/Button.vue'
import { usePaymentGatewayStore } from '@/stores/paymentGateway'
import axios from 'axios';

const home = useHomeStore()
const { currentUser, isLogin } = storeToRefs(home)
const paymentGateway = usePaymentGatewayStore()
const { payNowRecharge } = paymentGateway
const plan = usePlanStore();

const { getPlanById, getPlanByMap, updatePlanMapping } = plan
const { selectedPlan } = storeToRefs(plan)

const props = defineProps({
    planMapId: {
        type: String,
        required: true
    }
})

const isLoading = ref(true); // Loading state to delay rendering until data is ready

onMounted(async () => {
    console.log(props.planMapId)
    console.log("current user: ", currentUser.value)
    await getPlanByMap(Number(props.planMapId))

    const tokenFromStorage = localStorage.getItem('token');
    const userFromStorage = localStorage.getItem('user');

    if (tokenFromStorage) {
        isLogin.value = true;
        axios.defaults.headers.common['Authorization'] = `Bearer ${tokenFromStorage}`;
    }

    if (userFromStorage && !currentUser.value) {
        currentUser.value = JSON.parse(userFromStorage)
        console.log("Loaded currentUser from storage:", currentUser.value);
    }

    isLoading.value = false; // Set loading to false once data is ready
})

watch(currentUser, (newVal) => {
    if (newVal) {
        console.log("currentUser has been set:", newVal)
    }
})

</script>

<template>
    <!-- Only render if not loading -->
    <section v-if="!isLoading" class="flex w-full h-[100vh] justify-center items-center bg-white">
        <div class="relative z-0 mb-5 group shadow-4 p-4 space-y-2">
            <h3 class="text-md font-semibold text-black uppercase">{{ selectedPlan.planType }} plan</h3>
            <h3 class="text-md font-semibold text-black">{{ selectedPlan.planName }}</h3>
            <h4 class="font-semibold">&#8377;{{ selectedPlan.price }}</h4>
            <h4 class="font-semibold">
                <span>Payment To: </span>
                <!-- Conditional rendering for currentUser.userId -->
                <span v-if="selectedPlan.Gym">{{ selectedPlan.Gym.gymName }}</span>
                <span v-else>GymPass </span>
            </h4>
            <p class="text-sm">
                {{ selectedPlan.planDescription }}
            </p>
            <Button content="Pay"
                :handler="() => { payNowRecharge(selectedPlan.price, selectedPlan.gymId, selectedPlan.id, Number(props.planMapId), currentUser.userId, 'payment') }" />
        </div>
    </section>
</template>
