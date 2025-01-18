<template>
  <div>
    <!-- Restaurant Map -->
    <GMapMap
      v-if="restaurantLocation && isRestaurantRoute"
      :center="mapCenter"
      :zoom="15"
      class="map-self"
      :options="{
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true,
      }"
    >
      <GMapMarker
        :position="{
          lat: restaurantLocation[1],
          lng: restaurantLocation[0],
        }"
      />
    </GMapMap>

    <!-- Home Map -->
    <GMapMap
      v-if="geolocationData && !isRestaurantRoute"
      :center="{
        lat: geolocationData.latitude,
        lng: geolocationData.longitude,
      }"
      :zoom="15"
      class="map-self-big"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true,
      }"
    >
      <GMapMarker
        :position="{
          lat: geolocationData.latitude,
          lng: geolocationData.longitude,
        }"
      />
      <GMapMarker
        v-for="restaurant in restaurantsData"
        :key="restaurant.id"
        :position="{
          lat: restaurant.location.coordinates[1],
          lng: restaurant.location.coordinates[0],
        }"
        @click="handleMarkerClick(restaurant)"
      />
      <GMapInfoWindow
        v-if="selectedRestaurant"
        :position="{ lat: selectedRestaurant.location.coordinates[1], lng: selectedRestaurant.location.coordinates[0] }"
        :opened="true"
        @closeclick="handleExitInfoWindow()"
      >
        <div>
          <h2>{{ selectedRestaurant.name }}</h2>
          <div class="mapInfoContent">
            <img
              :src="selectedRestaurant.pictures[0]"
              alt="restaurant"
              style="width: 32%;" 
              />
              <div class="mapDescription">
                <p>{{ selectedRestaurant.address }}</p>
                <p>{{ selectedRestaurant.tel }}</p>
              </div>
          </div>
        </div>
      </GMapInfoWindow>
    </GMapMap>
  </div>
</template>

<script setup>
import { defineProps, computed, ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const selectedRestaurant = ref(null)
const geolocationData = ref(null)

const props = defineProps({
  restaurantLocation: {
    type: Object,
    default: null,
  },
  restaurantsData: {
    type: Array,
    default: null,
  }
})

const isRestaurantRoute = computed(
  () => route && route.path.startsWith("/restaurant")
)

const mapCenter = computed(() => {
  if (selectedRestaurant.value) {
    return {
      lat: selectedRestaurant.value.location.coordinates[1],
      lng: selectedRestaurant.value.location.coordinates[0],
    }
  } else if (geolocationData.value) {
    return {
      lat: geolocationData.value.latitude,
      lng: geolocationData.value.longitude,
    }
  } else {
    return { lat: 0, lng: 0 }
  }
})

const geolocate = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    geolocationData.value = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }
  })
}

const handleMarkerClick = (restaurant) => {
  selectedRestaurant.value = restaurant
}

const handleExitInfoWindow = () => {
  selectedRestaurant.value = null
}

onMounted(() => {
  geolocate()
})
</script>

<style>
.map-self {
  width: 100%;
  height: 310px;
  position: relative;
}

.map-self-big {
  width: 80%;
  height: 75vh;
  position: relative;
  margin-bottom: 3vh;
}

.vue-map {
  border-radius: 10px;
}
.mapInfoContent {
  display: flex;
  margin-top: 8px;
}
.mapDescription {
  margin-left: 16px
}

.mapDescription p {
  margin-bottom: 8px;
}

</style>
