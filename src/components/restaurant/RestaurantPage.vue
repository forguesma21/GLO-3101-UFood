<template>
  <div class="container restaurant">
    <div class="restaurant-header">
      <div class="restaurant-info">
        <div v-if="restaurantData">
          <p class="restaurant-title">
            {{ restaurantData.name }}
          </p>
          <div class="restaurant-subinfo">
            <text
              >$$ ◦
              <span
                v-for="(genre, index) in restaurantData.genres"
                :key="index"
              >
                {{ genre
                }}{{ index < restaurantData.genres.length - 1 ? " ◦ " : "" }}
              </span></text
            >

            <div style="display: flex; gap: 5px">
              <text>{{ roundedRating }}</text>
              <i
                class="bx bxs-star"
                style="color: var(--yellow); font-size: 20px"
              ></i>
              <text>200+ Ratings</text>
            </div>
          </div>
        </div>

        <div class="restaurant-icons">
          <v-btn
            class="visit-button"
            color="primary"
            text="Add a visit"
            variant="outlined"
            @click="openModal"
            @closeModal-emit="closeModal"
          ></v-btn>
          <VisitModal
            v-if="isModalOpened"
            :isOpen="isModalOpened"
            :restaurantData="restaurantData"
            @closeModal-emit="closeModal"
          />
          <AddToList v-if="restaurantData" :restaurantId="restaurantData.id" />
        </div>
      </div>
    </div>

    <div>
      <p class="title-section">Photos</p>
      <v-sheet v-if="restaurantData" max-width="100%">
        <v-slide-group show-arrows>
          <template v-slot:next>
            <v-icon color="orange" large
              ><i class="bx bx-chevron-right" style="color: var(--orange)"></i
            ></v-icon>
          </template>
          <template v-slot:prev>
            <v-icon color="orange" large
              ><i class="bx bx-chevron-left" style="color: var(--orange)"></i
            ></v-icon>
          </template>

          <v-slide-group-item
            v-for="(photo, index) in restaurantData.pictures"
            :key="index"
          >
            <img :src="photo" class="restaurant-img-carousel" />
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
    </div>

    <div style="display: flex; justify-content: center">
      <RestaurantInfo :restaurantData="restaurantData" />
    </div>
  </div>
</template>

<script setup>
import RestaurantInfo from "@/components/restaurant/RestaurantInfo.vue"
import VisitModal from "@/components/restaurant/VisitModal.vue"
import AddToList from "@/components/restaurant/AddToList.vue"
import { ref, defineProps, computed } from "vue"

const isModalOpened = ref(false)

const openModal = () => {
  isModalOpened.value = true
}

const closeModal = () => {
  isModalOpened.value = false
}

const roundedRating = computed(() => {
  return parseFloat(props.restaurantData.rating).toFixed(0)
})

const isLoggedIn = computed(() => {
  return isLoggedIn.value
})

const props = defineProps({
  restaurantData: {
    type: Object,
    required: true,
  },
})
</script>

<style>
.container.restaurant {
  display: flex;
  gap: 4.5rem;
  flex-direction: column;
  margin-bottom: 3rem;
}
.restaurant-header {
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
}
.title-section {
  font-size: 1.5rem;
  font-weight: 500;
  margin-left: 1.5rem;
  margin-bottom: 10px;
}
.restaurant-info {
  display: flex;
  justify-content: space-between;
}
.restaurant-title {
  font-size: 2.5rem;
  font-weight: 600;
}

.restaurant-icons {
  text-wrap: nowrap;
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.restaurant-img-carousel {
  gap: 10px;
  margin-right: 10px;
  width: 14rem;
  aspect-ratio: 1;
  border-radius: 8px;
}

@media screen and (max-width: 992px) {
}

@media screen and (max-width: 576px) {
  .restaurant-title {
    font-size: 1.8rem;
  }
  .restaurant-icons {
    font-size: 1rem;
    display: flex;
    gap: 1rem;
  }
  .bx {
    font-size: 20px;
  }
  .restaurant-info {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    gap: 1rem;
  }
}
</style>
