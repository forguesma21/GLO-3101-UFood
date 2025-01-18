<template>
  <div class="restaurant-card">
    <router-link
      :to="'/restaurant/' + restaurantsData.id"
      style="white-space: nowrap"
    >
      <img
        class="restaurant-img"
        alt="img"
        :src="restaurantsData.pictures[0]"
      />
    </router-link>
    <div class="img-title">
      <p class="restaurant-subtitle">40 mins</p>
      <i
        class="bx bxs-plus-circle"
        @click="openModal"
        @closeModal-emit="closeModal"
      ></i>
    </div>
    <router-link
      :to="'/restaurant/' + restaurantsData.id"
      style="white-space: nowrap"
    >
      <p class="restaurant-name">{{ restaurantsData.name }}</p>
    </router-link>
    <VisitModal
      v-if="isModalOpened"
      :isOpen="isModalOpened"
      :restaurantData="restaurantsData"
      @closeModal-emit="closeModal"
    />
  </div>
</template>

<script setup>
import VisitModal from "./VisitModal.vue"
import { ref, defineProps } from "vue"
const props = defineProps({
  restaurantsData: {
    type: Object,
    required: true,
  },
})
const isModalOpened = ref(false)
const openModal = () => {
  isModalOpened.value = true
}
const closeModal = () => {
  isModalOpened.value = false
}
</script>

<style>
.restaurant-card {
  position: relative;
  margin: 5px;
  height: 325px;
  width: 350px;
}

.restaurant-img {
  width: 100%;
  height: 280px;
  border: 1px solid grey;
  border-radius: 20px;
}
.img-title {
  display: flex;
  margin-left: 1rem;
  position: absolute;
  bottom: 3.5rem;
  align-items: center;
  width: 90%;
  justify-content: space-between;
}
.bxs-plus-circle {
  color: var(--orange);
  font-size: 1.8rem;
  cursor: pointer;
}
.bxs-plus-circle:hover {
  font-size: 2.2rem;
}

.restaurant-subtitle {
  border-radius: 20px;
  border: 1px solid grey;
  width: min-content;
  white-space: nowrap;
  padding: 0.1rem 0.4rem;
  background-color: white;
  font-weight: 600;
}

.restaurant-name {
  position: relative;
  white-space: nowrap;
  margin-left: 1rem;
  font-weight: 600;
  bottom: 0.5rem;
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* tablet */
@media screen and (max-width: 992px) {
  .Restaurant-container {
    min-height: 300px;
  }
}
/* mobile */
@media screen and (max-width: 425px) {
  .restaurant-card {
    margin: 10px;
    height: 325px;
    width: 275px;
  }
  .restaurant-name {
    line-height: 28px;
  }
}
@media screen and (max-width: 320px) {
  .restaurant-card {
    margin: 10px;
    height: 325px;
    width: 227px;
  }
  .restaurant-name {
    line-height: 28px;
  }
}
</style>
