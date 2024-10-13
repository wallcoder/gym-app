<script setup>
import Hero from '../../components/Hero.vue';
import {storeToRefs} from 'pinia';
import NavbarSecond from '../../components/Navbars/NavbarSecond.vue';
import { reactive, ref, onMounted } from 'vue';
import L from 'leaflet'; // Import Leaflet
import Button from '../../components/Button.vue';
import ButtonLink from '../../components/ButtonLink.vue';
import {usePlanStore} from '../../stores/plans'
import {useGymRegStore} from '../../stores/gymReg'
import {useTokenStore} from '../../stores/token'

const token = useTokenStore()
const {decodeToken, fetchUser} = token
const gymReg = useGymRegStore()
const {formData, handleRegister} = gymReg;
const plan = usePlanStore()
const {getSubscriptionPlanById} = plan;
const {subPlan} = storeToRefs(plan)


const props = defineProps({
    planId: {
        type: String,
        required: true
    },
    

})
const step = ref(1);


const nextStep = () => {
    if (step.value < 3) {
        step.value++;
    }
};

const prevStep = () => {
    if (step.value > 1) {
        step.value--;
    }
};

const submitForm = () => {
    console.log('Form submitted:', formData);
    alert('Form submitted! Check the console for data.');
};

const map = ref(null);
const mapContainerId = 'map'; // ID for the map container
let marker;

// Initialize the map
onMounted(() => {
    
    getSubscriptionPlanById(props.planId)
    decodeToken();
    // Check if the browser supports geolocation



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            // Initialize the map with user's current location
            map.value = L.map(mapContainerId).setView([lat, lng], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap',
            }).addTo(map.value);

            // Initialize marker at the user's current location
            marker = L.marker([lat, lng], { draggable: true }).addTo(map.value);

            // Update formData location on marker drag
            marker.on('dragend', (e) => {
                const latLng = e.target.getLatLng();
                formData.location.lat = latLng.lat;
                formData.location.lng = latLng.lng;
            });

            // Store user's location in formData
            formData.location.lat = lat;
            formData.location.lng = lng;
        }, (error) => {
            console.error('Error getting location:', error);
            alert('Unable to retrieve your location. Please ensure location services are enabled.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});
</script>

<template>
    <NavbarSecond />
    <section class="w-full flex flex-row items-center justify-center p-10 reg">
        <h1></h1>
        <div class="bg-white h-auto w-[90%] md:w-[70%] lg:w-[80%] shadow-lg rounded-md p-6">
            <h1 class="font-semibold mb-3">Gym Basic Information</h1>
            <form class="mx-auto" @submit.prevent="handleRegister">
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input v-model="formData.name" type="text" name="floating_first_name" id="floating_first_name"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                placeholder=" " required />
                            <label for="floating_first_name"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                                    duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                                    peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first
                                      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gym Name*</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input v-model="formData.email" type="text" name="floating_first_name" id="floating_first_name"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                placeholder=" " required />
                            <label for="floating_first_name"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                                    duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                                    peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first
                                      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email*</label>
                        </div>

                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input v-model="formData.contact" type="text" name="floating_first_name" id="floating_first_name" 
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                placeholder=" " required />
                            <label for="floating_first_name"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                                    duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                                    peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first
                                      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone*</label>
                        </div>
                        

                    </div>
                </div>
                
                


                <h1 class="font-semibold mb-3">Gym Location</h1>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input v-model="formData.address" type="text" name="floating_first_name" id="floating_first_name" 
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                placeholder=" " required />
                            <label for="floating_first_name"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                                    duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                                    peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first
                                      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_first_name" id="floating_first_name" v-model="formData.location.lat"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                placeholder=" " required />
                            <label for="floating_first_name"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                                    duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                                    peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first
                                      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Latitude*</label>
                        </div>

                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_first_name" id="floating_first_name" v-model="formData.location.lng"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                placeholder=" " required />
                            <label for="floating_first_name"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                                    duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                                    peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first
                                      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Longitude</label>
                        </div>
                        

                    </div>
                </div>

                <!-- MAP to be continued  -->
                <h2 class="font-semibold mt-5">Select Gym Location*</h2>
                <div id="map" class="h-64 w-full mb-5"></div> 
                <Button content="Register" buttonType="submit" />

                
            </form>
        </div>
    </section>
</template>

<style scoped>
#map {
    height: 300px;
}

.reg{
    background: url(../../assets/images/wallpaper2.jpg);
    
}
</style>
