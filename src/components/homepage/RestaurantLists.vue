<template>
  <div class="container restaurant-lists">
    <div class="carousel-section">
      <p class="carousel-title">All restaurants</p>
    </div>

    <v-sheet max-width="100%">
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
          v-for="(restaurant, index) in restaurantsData"
          :key="index"
        >
          <RestaurantCard
            v-if="restaurantsData.length > 0"
            :restaurantsData="restaurantsData[index]"
            :key="restaurantsData[index].id"
          />
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <div class="carousel-section">
      <p class="carousel-title">Popular near you</p>
    </div>
    <v-sheet max-width="100%">
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
          v-for="(restaurant, index) in restaurantsData"
          :key="index"
        >
          <RestaurantCard
            v-if="restaurantsData.length > 0"
            :restaurantsData="restaurantsData[index]"
            :key="restaurantsData[index].id"
          />
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <div class="carousel-section">
      <p class="carousel-title">Your favorites</p>
    </div>
    <v-sheet max-width="100%">
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
          v-for="(restaurant, index) in restaurantsData"
          :key="index"
        >
          <RestaurantCard
            v-if="restaurantsData.length > 0"
            :restaurantsData="restaurantsData[index]"
            :key="restaurantsData[index].id"
          />
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
import RestaurantCard from "../restaurant/RestaurantCard.vue"

export default {
  components: {
    RestaurantCard,
  },
  props: {
    restaurantsData: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.container.restaurant-lists {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;
  margin-bottom: 5rem;
}

.carousel-title {
  font-size: 2.2rem;
  font-weight: var(--font-semi-bold);
}
.carousel-photos {
  display: flex;
  gap: 1rem;
}

.bx {
  font-size: 2rem;
}

/* responsive typo */
@media screen and (max-width: 992px) {
}

/* Tablets */
@media screen and (max-width: 768px) {
}

/* Mobile devices */
@media screen and (max-width: 425px) {
}

@media screen and (max-width: 320px) {
  .v-slide-group__next,
  .v-slide-group__prev {
    min-width: 23px;
  }
}
</style>
