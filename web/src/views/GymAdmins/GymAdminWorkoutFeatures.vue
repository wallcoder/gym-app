<script setup>
import { useGymRegStore } from '@/stores/gymReg';
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useGymAdminStore } from '@/stores/gymAdmin';

const gymAdmin = useGymAdminStore();
const { getMyGymFeatures, getMyGymWorkouts, updateGymFeature, updateGymWorkout } = gymAdmin;
const { myGymFeatures, myGymWorkouts, gymIdRef } = storeToRefs(gymAdmin);
const gymReg = useGymRegStore();
const { fetchFeatures, fetchWorkouts } = gymReg;
const { allFeatures, allWorkouts } = storeToRefs(gymReg);

// Refs to store the sets of IDs
const gymWorkoutIdSet = ref(new Set());
const gymFeatureIdSet = ref(new Set());

// Update the sets whenever myGymFeatures or myGymWorkouts change
watch(myGymWorkouts, (newWorkouts) => {
    gymWorkoutIdSet.value = new Set(newWorkouts.map((workout) => workout.gymWorkoutId));
});

watch(myGymFeatures, (newFeatures) => {
    gymFeatureIdSet.value = new Set(newFeatures.map((feature) => feature.gymFeatureId));
});

// Functions to check if an item is in the respective set
const isInMyGymWorkouts = (id) => gymWorkoutIdSet.value.has(id);
const isInMyGymFeatures = (id) => gymFeatureIdSet.value.has(id);

onMounted(() => {
    fetchFeatures();
    fetchWorkouts();
    getMyGymFeatures(gymIdRef.value);
    getMyGymWorkouts(gymIdRef.value);
});
</script>


<template>
    <div
      class="p-2 bg-gray-100 space-y-4 flex flex-col h-[84vh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 min-w-[500px] tablet:w-[100%] overflow-y-auto max-h-[95vh]"
    >
      <section>
        <h1 class="text-xl">Workouts</h1>
        <div class="flex justify-start items flex-wrap">
          <span @click="updateGymWorkout(f.id, gymIdRef)"
            v-for="f in allWorkouts"
            :key="f.id"
            :class="{
              'border p-2 mx-1 my-1 py-1 rounded-xl hover:cursor-pointer transition-all duration-100 ease-in': true,
              'bg-[#3C50E0] text-white border-none ': isInMyGymWorkouts(f.id)
            }"
          >
            {{ f.workoutName }}
          </span>
        </div>
      </section>
      <section>
        <h1 class="text-xl">Features</h1>
        <div class="flex justify-start items flex-wrap">
          <span @click="updateGymFeature(f.id, gymIdRef)"
            v-for="f in allFeatures"
            :key="f.id"
            :class="{
              'border p-2 mx-1 my-1 py-1 rounded-xl hover:cursor-pointer transition-all duration-100 ease-in': true,
              'bg-first text-white border-none ': isInMyGymFeatures(f.id)
            }"
          >
            {{ f.featureName }}
          </span>
        </div>
      </section>
    </div>
</template>
