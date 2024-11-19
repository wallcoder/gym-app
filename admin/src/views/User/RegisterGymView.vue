<script setup>
import Hero from '../../components/Hero.vue';
import { storeToRefs } from 'pinia';
import NavbarSecond from '../../components/Navbars/NavbarSecond.vue';
import { reactive, ref, onMounted } from 'vue';
import L from 'leaflet'; // Import Leaflet
import Button from '../../components/Button.vue';
import ButtonLink from '../../components/ButtonLink.vue';
import { usePlanStore } from '../../stores/plans'
import { useGymRegStore } from '../../stores/gymReg'
import { useTokenStore } from '../../stores/token'
// import GMap from '@/components/GMap.vue'

const token = useTokenStore()
const { decodeToken, fetchUser } = token
const gymReg = useGymRegStore()
const { formData, handleRegister, handleGymImages, handleGymProfileImage, handleGymLicense, toggleFeature, toggleWorkout, fetchFeatures, fetchWorkouts } = gymReg;
const { message, isFormValid, allFeatures, allWorkouts } = storeToRefs(gymReg)
const plan = usePlanStore()
const { getSubscriptionPlanById } = plan;
const { subPlan } = storeToRefs(plan)





const props = defineProps({
    planId: {
        type: String,
        required: true
    },
    planName: {
        type: String,
        required: true
    }


})
const step = ref(1);


const nextStep = () => {
    if (step.value < 2) {
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
onMounted(async () => {

    await fetchFeatures();
    await fetchWorkouts();

    getSubscriptionPlanById(Number(props.planId))
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
    <!-- <GMap /> -->
    <section class="w-full flex  flex-col items-center justify-center px-4 laptop:px-10 pb-30 reg bg-white">

        <div class="h-auto w-[100%] md:w-[70%] lg:w-[55%] py-5 ">

            <form class="mx-auto flex flex-col space-y-5" @submit.prevent="handleRegister(props.planId)">
                <div class=" flex flex-col space-y-5" v-show="step === 2">
                    <h1 class="font-semibold mb-3 text-black text-2xl " v-motion-fade-visible-once>Other Gym Details</h1>
                    <div class="bg-white rounded-xl p-6 shadow-6" v-motion-fade-visible-once>
                        <h1 class="font-semibold  text-black text-2xl ">Add Gym Images*</h1>
                        <p class="text-sm mb-2">Upload atleast one image of your gym</p>
                        <span class="text-red text-sm mb-3" v-if="message.gymImages">{{ message.gymImages }}</span>
                        <div class="flex items-center w-full bg-forth p-4">
                            
                                
                                <input id="dropzone-file-gym-images" type="file" class="border-none" multiple name="gym-images"
                                    @change="handleGymImages" required/>
                            

                        </div>



                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-6" v-motion-fade-visible-once>
                        <h1 class="font-semibold  text-black text-2xl ">Add Gym Profile Image*</h1>
                        <p class="text-sm mb-3">Upload atleast one image of your gym</p>
                        <span class="text-red text-sm mb-3" v-if="message.gymProfileImage">{{ message.gymProfileImage
                        }}</span>

                        <div class="flex items-center w-full bg-forth p-4">
                            
                                
                                <input id="dropzone-file-profile-image" type="file" class="border-none"  name="gym-profile-image"
                                    @change="handleGymProfileImage" required/>
                           
                        </div>


                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-6" v-motion-fade-visible-once>
                        <h1 class="font-semibold  text-black text-2xl ">Add Gym License*</h1>
                        <p class="text-sm mb-3">Upload gym license(Only PDF is accepted)</p>
                        <span class="text-red text-sm mb-3" v-if="message.gymLicense">{{ message.gymLicense
                        }}</span>

                        <div class="flex items-center w-full bg-forth p-4">
                            
                                
                                <input id="dropzone-file-profile-image" type="file" class="border-none"  name="gym-profile-image"
                                    @change="handleGymLicense" required/>
                           
                        </div>


                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-6" v-motion-fade-visible-once>
                        <h1 class="font-semibold  text-black text-2xl ">Opening Hours*</h1>
                        <p class="text-sm mb-3">Add opening hours of your gym in during morning and eving</p>
                        <h1 class="font-semibold  text-black text-xl mb-3">Morning</h1>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <input v-model="formData.openingHours.morning.start" type="time" name="floating_first_name"
                                    id="morning-start"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " required />
                                <label for="morning-start"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Start
                                    time*</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input v-model="formData.openingHours.morning.end" type="time" name="floating_last_name"
                                    id="morning-end"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " required />
                                <label for="morning-end"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">End
                                    time*</label>
                            </div>

                        </div>
                        <h1 class="font-semibold  text-black text-xl mb-3">Evening</h1>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <input v-model="formData.openingHours.evening.start" type="time" name="floating_first_name"
                                    id="evening-start"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " required />
                                <label for="evening-start"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Start
                                    time*</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input v-model="formData.openingHours.evening.end" type="time" name="floating_last_name"
                                    id="evening-end"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " required />
                                <label for="evening-end"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">End
                                    time*</label>
                            </div>

                        </div>



                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-6" v-motion-fade-visible-once>
                        <h1 class="font-semibold  text-black text-2xl ">Razorpay API Key*</h1>
                        <p class="text-sm mb-3">Enter Razorpay API keys to receive payment(Don't worry, your API keys are
                            safe with us)</p>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <input v-model="formData.publicKey" type="password" name="ownerName" id="ownerName"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " required />
                                <label for="ownerName"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">API
                                    Public Key*</label>
                            </div>
                            <div class="relative z-0 w-full  group">
                                <input v-model="formData.secretKey" type="password" name="email" id="email"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " required />
                                <label for="email"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">API
                                    Secret Key*</label>
                                <span class="text-red text-sm ">{{ message.email }}</span>
                            </div>


                        </div>



                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-6" v-motion-fade-visible-once>
                        <h1 class="font-semibold  text-black text-2xl ">Membership Plan</h1>
                        <p class="text-sm mb-3">Add Membership plans offered by your gym(More Plans can be added later)</p>
                        <h1 class="font-semibold  text-black text-xl mb-3">Plan-1</h1>

                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <input v-model="formData.membershipPlans.plan1.title" type="text" name="plan1-title"
                                    id="plan1-title"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " required />
                                <label for="plan1-title"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Plan
                                    Title*</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input v-model="formData.membershipPlans.plan1.price" type="number" name="plan1-price"
                                    id="plan1-price"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " required />
                                <label for="plan1-price"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price*</label>
                            </div>



                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input v-model="formData.membershipPlans.plan1.duration" type="number" name="plan1-duration"
                                id="plan1-duration"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                placeholder=" " required />
                            <label for="plan1-duration"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Duration(months)*</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <textarea
                                class="block py-2.5 px-2 rounded-lg w-full text-sm text-gray-900 bg-transparent border border-graydark  focus:ring-0 focus:border-first "
                                name="" cols="30" rows="5" placeholder="Add Description"
                                v-model="formData.membershipPlans.plan1.description" required></textarea>
                        </div>
                        <!-- <h1 class="font-semibold  text-black text-xl mb-3">Plan-2</h1> -->

                        <!-- <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <input v-model="formData.membershipPlans.plan2.title" type="text" name="plan2-title"
                                    id="plan2-title"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " />
                                <label for="plan2-title"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Plan
                                    Title</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input v-model="formData.membershipPlans.plan2.price" type="number" name="plan2-price"
                                    id="plan2-price"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " />
                                <label for="plan1-price"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                            </div>



                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input v-model="formData.membershipPlans.plan2.duration" type="number" name="plan2-duration"
                                id="plan2-duration"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                placeholder=" " />
                            <label for="plan2-duration"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Duration(months)</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <textarea
                                class="block py-2.5 px-2 rounded-lg w-full text-sm text-gray-900 bg-transparent border border-graydark  focus:ring-0 focus:border-first "
                                name="" cols="30" rows="5" placeholder="Add Description"
                                v-model="formData.membershipPlans.plan2.description"></textarea>
                        </div>
                        <h1 class="font-semibold  text-black text-xl mb-3">Plan-3</h1>

                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <input v-model="formData.membershipPlans.plan3.title" type="text" name="plan3-title"
                                    id="plan3-title"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " />
                                <label for="plan1-title"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Plan
                                    Title</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input v-model="formData.membershipPlans.plan3.price" type="number" name="plan3-price"
                                    id="plan3-price"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " />
                                <label for="plan3-price"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                            </div>



                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input v-model="formData.membershipPlans.plan3.duration" type="number" name="plan3-duration"
                                id="plan3-duration"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                placeholder=" " />
                            <label for="plan3-duration"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Duration(months)</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <textarea
                                class="block py-2.5 px-2 rounded-lg w-full text-sm text-gray-900 bg-transparent border border-graydark  focus:ring-0 focus:border-first "
                                name="" cols="30" rows="5" placeholder="Add Description"
                                v-model="formData.membershipPlans.plan3.description"></textarea>
                        </div> -->



                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-6" v-motion-fade-visible-once>
                        <h1 class="font-semibold  text-black text-2xl ">Features</h1>
                        <p class="text-sm mb-3">Select features of your gym</p>
                        <div class="flex flex-wrap space-y-2 space-x-2 ">
                            <span
                                class="border p-2 py-1 rounded-xl hover:cursor-pointer transition-all duration-100 ease-in"
                                v-for="f in allFeatures" :key="f.id" @click="toggleFeature(f.id)" :class="{
                                    'bg-first text-white': formData.features.includes(f.id), // Style when selected
                                    'text-black': !formData.features.includes(f.id) // Default style when not selected
                                }">
                                {{ f.featureName }}
                            </span>


                        </div>




                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-6" v-motion-fade-visible-once>
                        <h1 class="font-semibold  text-black text-2xl ">Workouts</h1>
                        <p class="text-sm mb-3">Select workouts available in your gym</p>
                        <div class="flex flex-wrap space-x-2 space-y-2">
                            <span
                                class="border p-2 py-1 rounded-xl hover:cursor-pointer transition-all duration-100 ease-in"
                                v-for="w in allWorkouts" :key="w.id" @click="toggleWorkout(w.id)" :class="{
                                    'bg-first text-white': formData.workouts.includes(w.id), // Style when selected
                                    'text-black': !formData.workouts.includes(w.id) // Default style when not selected
                                }">
                                {{ w.workoutName }}
                            </span>



                        </div>




                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-6" v-motion-fade-visible-once>
                        <h1 class="font-semibold  text-black text-2xl ">Submission</h1>
                        <p class="text-sm mb-3">Submit your gym details for <span
                                class="text-first font-semibold">verification</span>. Once your gym is verified, you'll
                            receive a <span class="text-first font-semibold">notification via email or your GymPass
                                account</span>. Afterward, you can proceed with the <span
                                class="text-first font-semibold">payment</span>, and your gym will be listed. Thank you for
                            your interest! </p>
                        <Button content="Submit" buttonType="submit" />




                    </div>




                </div>
                <div class=" flex flex-col space-y-5" v-show="step === 1">
                    <h1 class="font-semibold mb-3 text-black text-2xl " v-motion-fade-visible-once>Gym Information</h1>
                    <div class="bg-white rounded-xl p-6 shadow-6" v-motion-fade-visible-once>
                        <h1 class="font-semibold  text-black text-2xl ">Add Gym Details</h1>
                        <p class="text-sm mb-3">Customer will be able to see this</p>
                        <div class="relative z-0 w-full  group">
                            <input v-model="formData.name" type="text" name="gym-name" id="gym-name"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                placeholder=" " required />
                            <label for="gym-name"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                                    duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                                    peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first
                                      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gym
                                Name*</label>
                        </div>


                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-6" v-motion-fade-visible-once>
                        <h1 class="font-semibold  text-black text-2xl ">Owner Details</h1>
                        <p class="text-sm mb-3">GymPass will use this for all business communication</p>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <input v-model="formData.ownerName" type="text" name="ownerName" id="ownerName"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " required />
                                <label for="ownerName"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full
                                    Name*</label>
                            </div>
                            <div class="relative z-0 w-full  group">
                                <input v-model="formData.email" type="text" name="email" id="email"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " required />
                                <label for="email"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
                                    Address*</label>
                                <span class="text-red text-sm ">{{ message.email }}</span>
                            </div>


                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input v-model="formData.contact" type="number" name="contact" id="contact"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                placeholder=" " required />
                            <label for="contact"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                                    duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                                    peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first
                                      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone
                                Number*</label>
                            <span class="text-red text-sm ">{{ message.phone }}</span>
                        </div>


                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-6" v-motion-fade-visible-once>
                        <h1 class="font-semibold  text-black text-2xl ">Gym Location</h1>
                        <p class="text-sm mb-3">Drag the marker to your gym location(or enter the coordinates)</p>
                        <div id="map" class="h-64 w-full mb-5 z-9"></div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <input v-model="formData.location.lat" type="text" name="lat" id="lat"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " required />
                                <label for="lat"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Latitude*</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input v-model="formData.location.lng" type="text" name="lng" id="lng"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " required />
                                <label for="lng"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Longitude*</label>
                            </div>

                        </div>

                        <h1 class="font-semibold  text-black text-xl ">Gym Location Details</h1>
                        <p class="text-sm mb-3">Location details should align with the location marked above</p>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <input v-model="formData.location.buildingNo" type="text" name="building-no"
                                    id="building-no"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " />
                                <label for="building-no"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Building
                                    Number(Optional)</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input v-model="formData.location.area" type="text" name="area" id="area"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " required />
                                <label for="area"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Area/Locality*</label>
                            </div>

                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <input v-model="formData.location.city" type="text" name="city" id="city"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " required />
                                <label for="city"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City*</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input v-model="formData.location.landmark" type="text" name="landmark" id="landmark"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-first peer"
                                    placeholder=" " />
                                <label for="landmark"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-first  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nearby
                                    Landmark(optional)</label>
                            </div>

                        </div>
                    </div>


                </div>








                <div
                    class="fixed left-0 bottom-0 z-10 w-[100vw] flex justify-center bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">

                    <Button content="Previous" buttonType="button" :handler="() => { prevStep() }" extraStyle="mx-2"
                        v-if="step !== 1" />
                    <Button content="Next" buttonType="button" :handler="() => { nextStep() }" extraStyle="mx-2"
                        v-if="step !== 2" />
                </div>



            </form>
        </div>
    </section>
</template>

<style scoped>
#map {
    height: 300px;
}</style>
