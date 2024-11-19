import { defineStore } from "pinia";
import { storeToRefs } from 'pinia'
import { ref, watch } from "vue";
import axios from "axios";
import { useGymStore } from '@/stores/gyms'

export const useSearchBarStore = defineStore('searchBar', () => {
    const gymStore = useGymStore()
    const { searchGyms, getGyms } = gymStore
    const { searchedGyms } = storeToRefs(gymStore)
    const isOpenSugg = ref(false)
    const isOpenLoc = ref(false)
    const query = ref("")
    const hasSearched = ref(false);
    const location = ref("Aizawl")

    watch(query, (newQuery) => {
        hasSearched.value = true

        if (newQuery == '') {
            hasSearched.value = false
        } else {
            isOpenSugg.value = true
        }
        searchGyms(newQuery, location.value)
    })
    const toggleSugg = () => {
        isOpenSugg.value = !isOpenSugg.value
        isOpenLoc.value = false
    }
    const detectCurrentLocation = (all=true) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                        .then(response => response.json())
                        .then(data => {
                            if (data && data.address) {

                                const city = data.address.city || data.address.town || data.address.village || 'Your location';
                                location.value = city;


                            }
                        })
                        .catch(error => {
                            console.error('Error fetching location:', error);
                        });
                },
                (error) => {
                    console.error('Error detecting location:', error.message);
                }
            );
            isOpenLoc.value = false
            if(all){
                getGyms(1,20,location.value)
            }else{
                getGyms(1,3,location.value)
            }
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }
    const toggleLoc = () => {
        isOpenLoc.value = !isOpenLoc.value
        isOpenSugg.value = false
    }

    // watch(query, (newVal)=>{
    //     if(newVal){
    //         isOpenSugg.value = true
    //     }else{
    //         isOpenSugg.value = false
    //     }

    // })
    return {
        location, detectCurrentLocation, isOpenLoc, isOpenSugg, toggleLoc, toggleSugg, query, hasSearched
    }
})
