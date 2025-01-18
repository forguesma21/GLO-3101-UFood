<template>
  <div>
    <HeroPage />

    <div v-if="!isLogged">
      <div class="paywall">
        <RestaurantFilter
          @filter-changed="updateRestaurantsDisplayed"
          :genres="genreFilters"
          :price_range="priceRangeFilters"
          :rating="ratingFilters"
        />
      </div>
      <div class="paywall-message">
        <p style="font-weight: 600">UFOOD</p>
        <p
          style="
            text-align: center;
            text-decoration: underline;
            cursor: pointer;
          "
          @click="openModal"
        >
          Create your free account or log in to continue.
        </p>
        <ConnectionModal
          v-if="isModalOpened"
          :isOpen="isModalOpened"
          @modal-close="closeModal"
        />
      </div>
    </div>
    
    <div v-if="isLogged">
      <RestaurantFilter
        @filter-changed="updateRestaurantsDisplayed"
        @view-changed="changeView"
        @search="filterRestaurants"
        :key="componentKey"
        :genres="genreFilters"
        :price_range="priceRangeFilters"
        :rating="ratingFilters"
      />
      <MapRestaurant v-if="viewList == 'map'" class="map-container" style="min-height: 30vh;" :geolocationData="geolocationData" :restaurantsData="restaurantsData" />
      <div v-if="viewList == 'list'">
        <RestaurantsFilteredLists
          v-if="filtersActive"
          :restaurantsData="restaurantsData"
        />
        <RestaurantsLists
          v-if="!filtersActive"
          :restaurantsData="restaurantsData"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import HeroPage from "@/components/HeroPage.vue"
import MapRestaurant from "@/components/common/Map.vue"
import RestaurantFilter from "@/components/homepage/RestaurantFilter.vue"
import RestaurantsLists from "@/components/homepage/RestaurantLists.vue"
import RestaurantsFilteredLists from "@/components/homepage/RestaurantsFilteredList.vue"
import Cookies from "js-cookie"
import { getRestaurantByGenre, getRestaurants } from "@/services/restaurantAPI"
import { getTokenInfo, getAllUsers } from "@/services/userAPI"
import { ref, onMounted } from "vue"

import ConnectionModal from "@/components/ConnectionModal.vue"

const restaurantsData = ref([])
const restaurantDataBackup = ref([])
const filtersActive = ref()
const genreFilters = ref([])
const priceRangeFilters = ref([])
const ratingFilters = ref([])
const isLogged = ref(false)
const userInfo = ref({})
const allUsers = ref({})
const componentKey = ref(0)
const viewList = ref('list')
const isModalOpened = ref(false)

const filterDuplicates = (array) => [...new Set(array)]

const concatenateGenres = (index) => {
  genreFilters.value.push(...restaurantsData.value[index].genres)
  return genreFilters.value
}

const grabFilters = async () => {
  genreFilters.value = []
  priceRangeFilters.value = []
  ratingFilters.value = []

  restaurantsData?.value?.forEach((restaurant) => {
    if (restaurant.genres && restaurant.genres.length) {
      genreFilters.value.push(...restaurant.genres)
    }
    if (restaurant.price_range) {
      priceRangeFilters.value.push(restaurant.price_range)
    }
    if (restaurant.rating) {
      ratingFilters.value.push(Math.round(restaurant.rating))
    }
  })

  genreFilters.value = filterDuplicates(genreFilters.value)
  priceRangeFilters.value = filterDuplicates(priceRangeFilters.value)
  ratingFilters.value = filterDuplicates(ratingFilters.value)
}

const updateRestaurantsDisplayed = async (filtersKeys, filtersArray) => {
  filtersActive.value = filtersArray.length > 0
  if (filtersArray.length == 0) {
    restaurantsData.value = await getRestaurants()
    componentKey.value++
  } else {
    restaurantsData.value = await getRestaurantByGenre(
      filtersKeys,
      filtersArray
    )
    allUsers.value = await getAllUsers()
    componentKey.value++
  }
}

const loadUserInfo = async () => {
  if (Cookies.get("access_token")) {
    userInfo.value = await getTokenInfo()
    isLogged.value = true
    console.log("The user is connected")
  } else {
    isLogged.value = false
    console.log("The user is not connected ")
  }
}

const openModal = () => {
  isModalOpened.value = true
}

const closeModal = () => {
  isModalOpened.value = false
}

const loadRestaurants = async () => {
  try {
    const data = await getRestaurants()
    restaurantsData.value = data || []
    restaurantDataBackup.value = data || []
  } catch (error) {
    console.error("Failed to fetch restaurants:", error)
    restaurantsData.value = []
  }
}

const changeView = async (view) => {
  viewList.value = view
}

const filterRestaurants = async (searchInput) => {
  console.log("searchInput", searchInput)
  console.log("restaurantDataBackup", restaurantDataBackup.value)
  restaurantsData.value = restaurantDataBackup.value
  restaurantsData.value = restaurantsData.value.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchInput.toLowerCase())
      )
}

onMounted(async () => {
  await loadRestaurants()
  filtersActive.value = false
  await loadUserInfo()
  await updateRestaurantsDisplayed([], [])
  await grabFilters()
})
</script>

<style>
.paywall {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
  width: 100%;
  opacity: 2;
  filter: blur(2px);
  font-size: 20px;
  padding: 20px;
  mask: linear-gradient(transparent, black, black);
  pointer-events: none;
  position: absolute;
  z-index: 1;
}

.paywall-message {
  position: relative;
  top: 12rem;
  margin: auto;
  background-color: white;
  width: 60%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  z-index: 1;
  padding: 1.2rem;
  gap: 1rem;
}

.map-format {
  width: 80%
}

.map-container {
  display: flex;
  justify-content: center;
  min-height: 30vh;
}

</style>
