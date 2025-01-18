<template>
  <div class="container restaurant-lists">
    <h1>Filtered restaurants</h1>
    <div class="restaurant-grid">
      <div
        v-for="(restaurant, index) in restaurantsData"
        :key="index"
      >
        <RestaurantCard
          v-if="restaurantsData.length > 0"
          :restaurantsData="restaurant"
          :key="restaurant.id"
          class="restaurant-card"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RestaurantCard from "../restaurant/RestaurantCard.vue";

export default {
  props: {
    restaurantsData: {
      type: Array,
      required: true,
    },
  },
  components: {
    RestaurantCard,
  },
};
</script>

<style scoped>
.container.restaurant-lists {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;
  margin-bottom: 5rem;
}

.restaurant-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr)); /* 4 cards per row */
  gap: 20px; /* Adjust this as needed */
  justify-items: center;
  margin: 20px; /* Adjust margin as needed */
}
.restaurant-card{
  height: auto;
}

@media screen and (max-width: 107rem) {
  .restaurant-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr)); /* 4 cards per row */
  }
}

@media screen and (max-width: 84rem) {
  .restaurant-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* 4 cards per row */
  }
}

@media screen and (max-width: 53rem) {
  .restaurant-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr)); /* 4 cards per row */
  }
}

</style>
