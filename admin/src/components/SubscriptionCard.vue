<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';


const subsriptionDeals = ref([{
    id: 1,
    name: 'Listing Only',
    price: 700,
    description: 'List your gym on our app, with contact details displayed Member Registration will not be processed through our app.',

}, {
    id: 2,
    name: 'Full Plan',
    price: 1200,
    description: 'Our app will provide Gym Listing , membership registration and member management system.',


}])

</script>

<template>
    <div class="relative z-0 w-full mb-5 group shadow-4 p-4 space-y-2">
        <h3 class="text-md font-semibold text-black">Listing Only</h3>
        <h4 class="font-semibold">&#8377;1000/month</h4>
        <p class="text-sm">
            List your gym on our app, with contact details displayed
            Member Registration will not be processed through our app.
        </p>
        <RouterLink to="#" class="text-first font-semibold inline-block hover:underline">Register
        </RouterLink>
    </div>
</template>

<style scoped></style>