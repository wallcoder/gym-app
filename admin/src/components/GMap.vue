<template>
    <div>
        <input id="search-box" type="text" placeholder="Search location" class="search-box" />
        <div id="map" class="map"></div>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue'

const map = ref(null)
const marker = ref(null)

onMounted(() => {
    // Initialize map
    map.value = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 }, // Set default center (e.g., New York City)
        zoom: 13,
    })

    // Create the search box and link it to the input element
    const input = document.getElementById('search-box')
    const searchBox = new google.maps.places.SearchBox(input)

    // Bias searchBox results towards map's current viewport
    map.value.addListener('bounds_changed', () => {
        searchBox.setBounds(map.value.getBounds())
    })

    // Listen for the event fired when the user selects a prediction
    searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces()
        if (places.length === 0) return

        const place = places[0]

        // Clear out the old marker
        if (marker.value) marker.value.setMap(null)

        // Create a new marker for the selected place
        marker.value = new google.maps.Marker({
            position: place.geometry.location,
            map: map.value,
        })

        // Center map on the selected place
        map.value.setCenter(place.geometry.location)
        map.value.setZoom(15) // Optional: Zoom in to the location
    })
})
</script>
  
<style>
.map {
    height: 400px;
    /* Set height of the map */
    width: 100%;
}

.search-box {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    box-sizing: border-box;
}
</style>
  