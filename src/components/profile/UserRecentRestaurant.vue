<template>
  <div>
    <div class="container recent-restaurants">
      <p class="title-section">Recent visits</p>
      <p
        style="margin: auto"
        v-if="visitedRestaurants && visitedRestaurants.total == 0"
      >
        No recent visits
      </p>

      <v-sheet max-width="100%">
        <v-slide-group show-arrows v-if="dataLoaded">
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
            v-for="(restaurantId, index) in uniqueRestaurantIdsArray"
            :key="index"
          >
            <VisitInfoModal :restaurantId="restaurantId" />
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
import VisitInfoModal from "./VisitInfoModal.vue"
import { ref, defineProps, onMounted } from "vue"

const props = defineProps({
  visitedRestaurants: {
    type: Object,
    required: true,
  },
})

const uniqueRestaurantIdsArray = ref([])
const dataLoaded = ref(false)

const getUniqueIds = async () => {
  if (props.visitedRestaurants && props.visitedRestaurants.items) {
    const uniqueRestaurantIds = new Set()

    await Promise.resolve(props.visitedRestaurants.items)

    props.visitedRestaurants.items.forEach((item) => {
      uniqueRestaurantIds.add(item.restaurant_id)
    })

    uniqueRestaurantIdsArray.value = Array.from(uniqueRestaurantIds)
    dataLoaded.value = true
  }
}

onMounted(async () => {
  if (props.visitedRestaurants) {
    await getUniqueIds()
  }
})
</script>

<style>
.container.recent-restaurants {
  display: flex;
  flex-direction: column;
}

.recent-restaurants .title-section {
  font-size: var(--h12-font-size);
  font-weight: var(--font-bold);
  width: 90%;
  align-self: center;
  margin-left: 0;
  margin-bottom: 0;
}
/* tablet */
@media screen and (max-width: 992px) {
  .Recent-Restaurants-container {
    height: fit-content;
    max-height: max-content;
  }
}
/* mobile */
@media screen and (max-width: 425px) {
  .Recent-Restaurants-container {
    flex-direction: column;
    height: fit-content;
    max-height: max-content;
  }
  .Recent-title {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-left: 0%;
  }
}
</style>
