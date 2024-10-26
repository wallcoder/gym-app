<script setup>
import NavbarSecond from '../../components/Navbars/NavbarSecond.vue';
import Footer from '../../components/Footer.vue';
import { RouterLink } from 'vue-router';
import { useGymStore } from '../../stores/gyms';
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
import { usePaymentGatewayStore } from '../../stores/paymentGateway';
import { useTokenStore } from '../../stores/token';
import { useGymRegStore } from '../../stores/gymReg';
import LoaderSquare from '@/components/LoaderSquare.vue'

const token = useTokenStore();
const gymReg = useGymRegStore()
const { fetchFeatures, fetchWorkouts } = gymReg;
const { decodeToken } = token;
const { currentUserToken } = storeToRefs(token);

const pg = usePaymentGatewayStore();
const { payNow } = pg;

const gymStore = useGymStore();
const { gym } = storeToRefs(gymStore);
const { getGymById } = gymStore;

const api = import.meta.env.VITE_API;

const props = defineProps({
   id : {
        type: Number,
        required: true,
    },
});

onMounted(() => {
    getGymById(Number(props.id));
    fetchFeatures(props.id);
    fetchWorkouts(props.id);

    decodeToken();
});

const currentImageIndex = ref(0);

const nextImage = () => {
    if (gym.value && gym.value.GymImages) {
        currentImageIndex.value = (currentImageIndex.value + 1) % gym.value.GymImages.length;
    }
};

const prevImage = () => {
    if (gym.value && gym.value.GymImages) {
        currentImageIndex.value = (currentImageIndex.value - 1 + gym.value.GymImages.length) % gym.value.GymImages.length;
    }
};

setInterval(nextImage, 8000);
</script>

<template>
    <section>
        <LoaderSquare v-if="isLoadingSquare"/>
        <div class="px-3 tablet:px-[12%] flex flex-col pt-2 pb-30" v-else>
            <div class="relative py-4">
                <!-- Check if gym and GymImages are available -->
                <img v-if="gym?.GymImages?.length" :src="`${api}${gym.GymImages[currentImageIndex].gymImgPath}`" alt="gym"
                    class="w-full rounded-lg h-[50vh] object-cover transition duration-500 ease-in-out" v-motion-fade-visible-once/>
                <button @click="prevImage"
                    class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button @click="nextImage"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>

            <!-- Check if gym is available -->
            <h1 v-if="gym" class="text-2xl font-semibold text-black mb-2" v-motion-fade-visible-once>{{ gym.gymName }}</h1>

            <div class="flex flex-col tablet:flex-row tablet:justify-between">
                <div class="flex flex-col" v-motion-fade-visible-once>
                    <span class="flex items-center space-x-1">
                        <i class="fa-solid fa-star text-lg text-yellow-500"></i>
                        <span>4.2</span>
                    </span>

                    <!-- Check if GymLocation is available -->
                    <span v-if="gym?.GymLocation" class="flex flex-col">
                        <div class="flex items-center space-x-1">
                            <i class="fa-solid fa-location-dot text-lg text-first"></i>
                            <span>{{ gym.GymLocation.area }}, {{ gym.GymLocation.city }}</span>
                        </div>
                        <div>{{ gym.GymLocation.buildingNo }}, {{ gym.GymLocation.landmark }}</div>

                        <div class="flex items-center space-x-1">
                            <i class="fa-solid fa-diamond-turn-right text-lg text-first"></i>
                            <a :href="`https://www.google.com/maps?q=${gym.GymLocation.latitude},${gym.GymLocation.longitude}`"
                                target="_blank"
                                class="text-first font-semibold hover:underline flex items-center space-x-1">
                                <span>Direction</span>
                            </a>
                        </div>
                    </span>
                </div>

                <!-- Check if gym is available  -->
                <div v-if="gym" v-motion-fade-visible-once
                    class="flex flex-col bg-third p-3 rounded-xl font-semibold text-black my-3 tablet:my-0 tablet:w-[350px]">
                    <h1 class="text-xl mb-1">Contact Us</h1>
                    <h1>Phone: <span class="font-medium">{{ gym.gymPhone }}</span></h1>
                    <h1>Email: <span class="font-medium">{{ gym.gymEmail }}</span></h1>
                </div>
            </div>

            <div class="flex flex-col" v-motion-fade-visible-once>
                <h1 class="text-2xl font-semibold text-black mb-2">Opening Hours</h1>
                <div class="flex space-x-2">
                    <!-- Check if GymOpeningHour is available -->
                    <div v-if="gym?.GymOpeningHour"
                        class="flex flex-col bg-third p-3 rounded-xl font-semibold text-black my-3 tablet:my-0 tablet:w-[200px]">
                        <h1>Morning</h1>
                        <h1 class="text-sm">{{ gym.GymOpeningHour.morning }}</h1>
                    </div>
                    <div v-if="gym?.GymOpeningHour"
                        class="flex flex-col bg-third p-3 rounded-xl font-semibold text-black my-3 tablet:my-0 tablet:w-[200px]">
                        <h1>Evening</h1>
                        <h1 class="text-sm">{{ gym.GymOpeningHour.evening }}</h1>
                    </div>
                </div>
            </div>

            <div class="flex flex-col mt-[20px]" v-motion-fade-visible-once>
                <h1 class="text-2xl font-semibold text-black mb-2">Membership Plans</h1>
                <div class="flex space-y-2">
                    <!-- Check if Plans are available -->
                    <div v-for="e in gym?.Plans" :key="e.id"
                        class="flex flex-col bg-white shadow-4 p-3 rounded-xl font-semibold h-[120px] my-3 tablet:my-0 tablet:w-[300px] w-full space-y-1 justify-between">
                        <span>
                            <h1 class="text-black">{{ e.planName }}</h1>
                            <h1 class="text-sm">&#8377;{{ e.price }}/{{ e.duration == 1 ? '' : e.duration }} month</h1>
                            <p class="text-sm font-medium">{{ e.planDescription }}</p>
                        </span>
                        <button type="button" class="hover:underline text-first text-left"
                            @click="payNow(e.price, gym.id, e.id, currentUserToken.userId, 'payment')">Get Membership
                        </button>
                    </div>
                </div>
            </div>

            <div class="flex flex-col mt-[20px]" >
                <h1 class="text-2xl font-semibold text-black mb-2">Features</h1>
                <div class="flex space-x-4">
                    <!-- Check if GymFeatureMappings are available -->
                    <span v-for="e in gym?.GymFeatureMappings" :key="e.GymFeature.id" v-motion-fade-visible-once
                        class="bg-first py-2 px-4 rounded-2xl text-white font-medium">
                        {{ e.GymFeature.featureName }}
                    </span>
                </div>
            </div>

            <div class="flex flex-col mt-[20px]">
                <h1 class="text-2xl font-semibold text-black mb-2">Workouts Available</h1>
                <div class="flex space-x-4">
                    <!-- Check if GymWorkoutMappings are available -->
                    <span v-for="e in gym?.GymWorkoutMappings" :key="e.GymWorkout.id" v-motion-fade-visible-once
                        class="bg-first py-2 px-4 rounded-2xl text-white font-medium">
                        {{ e.GymWorkout.workoutName }}
                    </span>
                </div>
            </div>
            <!-- <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATYSURBVO3BQW4kSRIEQdNA/f/Lujz6KYBEenGaCxPBH6laclK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC365CUgv0nNBORGzRNAnlBzA+QJNROQ36TmjZOqRSdVi06qFn2yTM0mIN8E5EbNDZBJzaRmk5pNQDadVC06qVp0UrXoky8D8oSaJ9RMQJ5Q801AJjUTkEnNE0CeUPNNJ1WLTqoWnVQt+uSPAzKpeQLIpGYCcqNmAjKpmYBMav6fnFQtOqladFK16JM/Ts0EZFIzAZnUPKFmAjKpeQLIpOYvO6ladFK16KRq0SdfpuZfouYGyKRmArJJzRtq/iUnVYtOqhadVC36ZBmQ3wRkUjMBmdRMQCY1E5BJzQTkBsikZgIyqbkB8i87qVp0UrXopGoR/sgfBuQJNW8AeULNDZBJzV92UrXopGrRSdWiT14CMqmZgNyomYA8oWYCMql5Asik5g0gbwCZ1NwAmdRMQG7UvHFSteikatFJ1aJPlgG5UfOEmgnIjZobIJOaGyA3am6A3KiZgNwAuVFzo2YCsumkatFJ1aKTqkWfvKTmm4BsUvOEmieA3KiZgExqJiA3am6A3KjZdFK16KRq0UnVIvyRXwRkUvMEkEnNBOQJNU8AuVEzAblRcwPkDTU3QCY1b5xULTqpWnRStQh/5AUgk5oJyKRmAjKpmYBMam6A3KiZgExqJiBvqLkBMql5A8iNmm86qVp0UrXopGrRJy+pmYBMam7U3KiZgNyomYBMQDapmYDcAHkCyKTmRs0NkBs1b5xULTqpWnRSteiTl4C8AeQJNU+oeQLIpOab1ExAJjUTkEnNBOS/dFK16KRq0UnVIvyRF4B8k5oJyBtqJiCTmgnIpGYCMqnZBGRSMwGZ1NwAmdRsOqladFK16KRq0ScvqZmA3Kh5AsikZgIyqfkmIJOaGyCTmhsgk5oJyL/spGrRSdWik6pFnyxTcwNkUjMBmdRMQCY1E5BJzTcBuVHzTWpugPymk6pFJ1WLTqoWffISkEnNjZongDyhZgIyqbkB8oSaCcgEZFIzAdkE5EbNN51ULTqpWnRStQh/5A8BMqmZgExqngDyl6i5ATKp+aaTqkUnVYtOqhZ9sgzIG2omIJOaGzVPAPkmNROQTUD+JSdVi06qFp1ULcIf+cOAPKFmAjKpeQLIJjVPANmk5o2TqkUnVYtOqhZ98hKQ36TmRs0EZALyBJBJzW8CMql5Qs0EZFKz6aRq0UnVopOqRZ8sU7MJyBNAbtTcAHlDzQTkDTVPqLlR800nVYtOqhadVC365MuAPKHmCTUTkEnNBGRSM6m5ATKpmYBMam6ATEA2AblRs+mkatFJ1aKTqkWf/HFAJjUTkEnNDZBJzQ2QGyCTmknNBGRSMwG5ATKpuQEyqXnjpGrRSdWik6pFn/yfATKpmYDcqJmATGomIJOaGyCb1ExA/ksnVYtOqhadVC365MvUfJOaCcgEZFLzBpAngDyh5puATGo2nVQtOqladFK16JNlQH4TkBs1TwCZ1ExAJjVPqJmAPKFmAjKp+S+dVC06qVp0UrUIf6RqyUnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXofxwUPT6g5VpYAAAAAElFTkSuQmCC"
                alt="" class="w-80 h-80"> -->

        </div>
        <Footer />
    </section>
</template>
