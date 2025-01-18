<template>
  <div v-if="restaurantData" class="info-container">
    <div class="map">
      <MapRestaurant
        :restaurantLocation="restaurantData.location.coordinates"
      />
    </div>
    <div class="info-info">
      <div class="info" id="adress">
        <i class="bx bxs-map info-icon"></i>
        <p>{{ restaurantData.address }}</p>
      </div>

      <div class="info" id="hours">
        <i class="bx bx-time info-icon"></i>
        <div style="margin-right: 2rem">
          <p>sunday</p>
          <p>monday</p>
          <p>tuesday</p>
          <p>wednesday</p>
          <p>thursday</p>
          <p>friday</p>
          <p>saturday</p>
        </div>
        <div>
          <p>{{ restaurantData.opening_hours.sunday }}</p>
          <p>{{ restaurantData.opening_hours.monday }}</p>
          <p>{{ restaurantData.opening_hours.tuesday }}</p>
          <p>{{ restaurantData.opening_hours.wednesday }}</p>
          <p>{{ restaurantData.opening_hours.thursday }}</p>
          <p>{{ restaurantData.opening_hours.friday }}</p>
          <p>{{ restaurantData.opening_hours.saturday }}</p>
        </div>
      </div>

      <div class="info" id="phone">
        <i class="bx bx-phone info-icon"></i>
        <p>{{ restaurantData.tel }}</p>
      </div>

      <a
        target="_blank"
        class="get-direction"
        :href="`https://www.google.com/maps/dir/${geolocationData.latitude},${geolocationData.longitude}/${restaurantData.address}`"
      >
        Get direction
      </a>
    </div>
  </div>
</template>

<script>
import MapRestaurant from "@/components/common/Map.vue"

export default {
  data() {
    return {
      geolocationData: [],
    }
  },
  components: {
    MapRestaurant,
  },

  props: {
    restaurantData: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.geolocate()
  },
  methods: {
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geolocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
      })
    },
  },
}
</script>

<style>
.info-container {
  border-radius: 10px;
  padding: 20px;
  max-width: 900px;
  width: 90%;
  border: 2px solid black;
  align-self: center;
  display: flex;
}
.map {
  background-color: #cccccc00;
  width: 300px;
  height: 310px;
  border-radius: 10px;
  margin-right: 20px;
  border: 2px solid black;
  min-height: 310px;
}
.info-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}
.info {
  display: flex;
}
.info-icon {
  font-size: 25px;
  margin-right: 1rem;
}
.get-direction {
  background-color: rgb(249, 115, 26);
  color: rgb(255, 255, 255);
  cursor: pointer;
  border-radius: 12.5rem;
  padding: 0.6rem 1.3rem;
  margin-top: 1rem;
  text-align: center;
}

@media screen and (max-width: 992px) {
  .info-container {
    width: 95%;
  }
  .map {
    width: 270px;
  }
}

@media screen and (max-width: 576px) {
  .info-container {
    display: flex;
    flex-direction: column;
  }
  .map {
    width: 100%;
    margin: auto;
    margin-bottom: 30px;
  }
}
</style>
