<template>
  <div class="text-center pa-4">
    <v-dialog
      v-model="dialog"
      width="max-content"
      min-width="50%"
      persistent
      v-if="restaurantId && userId"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <div
          v-bind="activatorProps"
          class="restaurant-card"
          v-if="restaurantData"
        >
          <img
            class="restaurant-img"
            alt="img"
            :src="restaurantData.pictures[0]"
          />
          <p class="restaurant-subtitle">{{ restaurantData.name }}</p>
          <p class="number-visits" v-if="restaurantVisits">
            {{
              restaurantVisits.total === 1
                ? "Visited 1 time"
                : "Visited " + restaurantVisits.total + " times"
            }}
          </p>
        </div>
      </template>

      <v-card prepend-icon="mdi-hamburger" :title="restaurantData.name">
        <v-card-item>
          <v-timeline align="start" density="compact">
            <v-timeline-item
              v-for="visit in restaurantVisits.items"
              :key="visit.id"
              dot-color="orange"
              size="x-small"
            >
              <div class="mb-4">
                <div class="font-weight-normal">
                  <strong
                    >Date of visit :
                    {{ formatReadableDate(visit.date) }}</strong
                  >
                </div>
                <div>
                  Your review :
                  {{
                    visit.comment.length === 0 ? "-" : "“" + visit.comment + "”"
                  }}
                </div>

                <div>
                  Your rating for this visit :
                  {{ visit.rating }}
                </div>
              </div>
            </v-timeline-item>
          </v-timeline></v-card-item
        >

        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialog = false"> Close </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { getRestaurantById } from "@/services/restaurantAPI"
import { getRestaurantVisits, getTokenInfo } from "@/services/userAPI"
import { ref, onMounted } from "vue"

const dialog = ref(false)
const restaurantData = ref(null)
const restaurantVisits = ref(null)
const userInfo = ref(null)
const userId = ref(null)

const props = defineProps({
  restaurantId: {
    type: String,
    required: true,
  },
})

const getRestaurantData = async () => {
  try {
    userInfo.value = await getTokenInfo()
    userId.value = userInfo.value.id
  } catch (error) {
    console.log("erreur")
  }

  if (props.restaurantId) {
    restaurantData.value = await getRestaurantById(props.restaurantId)

    let visits = await getRestaurantVisits(userId.value, props.restaurantId)
    visits.items.sort((a, b) => new Date(a.date) - new Date(b.date))
    restaurantVisits.value = visits
  }
}

const formatReadableDate = (isoDateString) => {
  const date = new Date(isoDateString)
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return date.toLocaleDateString("en-US", options)
}

onMounted(async () => {
  await getRestaurantData()
})
</script>

<style></style>
