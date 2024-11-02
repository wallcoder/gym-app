<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import { useHomeStore } from '../stores/home';
import { usePlanStore } from '../stores/plans';
import { onClickOutside } from '@vueuse/core';
import Button from '../components/Button.vue';
import ButtonLink from '../components/ButtonLink.vue';

const home = useHomeStore();
const plan = usePlanStore();
const { modal, isOpenLogin, isOpenRegisterGym, isOpenSignUp } = storeToRefs(home);
const { subscriptionPlans } = storeToRefs(plan)
const { getSubscriptionPlans } = plan
const { closeModals } = home;
onMounted(() => {
    getSubscriptionPlans()
    onClickOutside(modal, () => {
        closeModals()
    });
})
</script>

<template>
    <Teleport to="#modal">
        <Transition name="modal">
            <div class="fixed top-0 p-4 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] dark:bg-[rgba(255,255,255,.1)] flex items-center justify-center z-[999999]"
                v-if="isOpenRegisterGym">
                <div class=" w-full smartphone-md:w-[500px]  bg-white rounded-lg shadow p-6 md:p-8 dark:bg-discount-dark"
                    ref='modal'>
                    <!-- Ensure this ref is 'modal' -->
                    <span class="flex w-full justify-end text-txt-light dark:text-txt-dark ">
                        <i class="fa-solid fa-xmark hover:cursor-pointer" @click="closeModals()"></i>
                    </span>
                    <h1 class="text-xl font-semibold text-black mb-4">Choose Subscription Plans</h1>


                    <div class="max-w-md mx-auto">
                        <div v-for="s in subscriptionPlans" :key="s.id"
                            class="relative z-0 w-full mb-5 group shadow-4 p-4 space-y-2">
                            <h3 class="text-md font-semibold text-black">{{ s.planName }}</h3>
                            <h4 class="font-semibold">&#8377;{{ s.price }}/month</h4>
                            <p class="text-sm">
                                {{ s.planDescription }}
                            </p>
                            <RouterLink :to="`/gym-registration/${s.id}/${s.planName}`"
                                class="text-first font-semibold inline-block hover:underline" @click="closeModals()">
                                Register
                            </RouterLink>
                        </div>




                    </div>

                </div>
            </div>
        </Transition>
    </Teleport>
</template>


<style scoped></style>
../stores/auth