<template>
  <div v-if="isVisible" class="list-card">
    <div class="list-img" v-if="restaurantData">
      <img
        style="width: 100%; aspect-ratio: 1"
        :src="restaurantData.pictures[0]"
      />
    </div>
    <div class="list-info">
      <div v-if="restaurantData">
        <p class="name">{{ restaurantData.name }}</p>
        <router-link :to="`/restaurant/${restaurantData.restaurant_id}`"
          ><u
            >Go to restaurant page
            <i class="bx bx-link-external" style="cursor: pointer"></i></u
        ></router-link>
      </div>

      <i
        v-if="isUserConnected"
        class="bx bx-trash"
        style="cursor: pointer"
        @click="deleteElementFromList()"
      ></i>
    </div>

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn color="pink" varriant="text" @click="undoDelete"> Cancel </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { getRestaurantById } from "@/services/restaurantAPI"
import {
  deleteFromList,
  postRestaurantToUserList,
} from "@/services/favoriteAPI.js"
import { defineProps, ref, onMounted, nextTick } from "vue"

const props = defineProps({
  restaurantId: {
    type: String,
    required: true,
  },
  listId: {
    type: String,
    required: true,
  },
  isUserConnected: {
    type: Object,
    required: true,
  },
})

const timeoutId = ref(null)
const restaurantData = ref()
const snackbar = ref({ show: false, text: "", timeout: 6000 })
const isVisible = ref(true)

const deleteElementFromList = async () => {
  try {
    await deleteFromList(props.restaurantId, props.listId)
    snackbar.value = {
      show: true,
      text: "Restaurant deleted from list. Click 'Cancel' to undo.",
      timeout: 6000,
    }

    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }

    timeoutId.value = setTimeout(() => {
      isVisible.value = false
    }, snackbar.value.timeout)
    console.log("Restaurant deleted successfully")
  } catch (error) {
    console.error("Error deleting restaurant from list:", error)
    isVisible.value = true
  }
}

const undoDelete = async () => {
  clearTimeout(timeoutId.value)
  try {
    await postRestaurantToUserList(props.listId, props.restaurantId)
    console.log("Deletion undone")
    isVisible.value = true
  } catch (error) {
    console.error("Error undoing the deletion:", error)
  }
  snackbar.value.show = false
}

onMounted(async () => {
  await nextTick()
  restaurantData.value = await getRestaurantById(props.restaurantId)
})
</script>

<style>
.list-card {
  display: flex;
  flex-direction: row;
  height: max-content;
  gap: 1rem;
}

.list-img {
  width: 100%;
}

.list-card .name {
  font-size: 1.5rem;
  padding: 0;
  font-weight: 500;
}
.list-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  gap: 1.5rem;
}
.bx.bx-trash {
  margin-right: 1rem;
  font-size: 1.5rem;
}

@media screen and (max-width: 768px) {
  .list-card {
    flex-direction: row;
    padding: 1.4rem;
    height: max-content;
    width: 100%;
  }
  .list-img {
    max-width: 50%;
  }
}
@media screen and (min-width: 768px) {
  .list-card {
    flex-direction: row;
    padding: 1.4rem;
    width: 90%;
    max-width: 1000px;
    margin: auto;
  }
  .list-img {
    max-width: 30%;
  }
}
@media screen and (max-width: 425px) {
  .list-card {
    flex-direction: row;
    padding: 1.4rem;
    height: max-content;
    width: 100%;
  }

  .list-img {
    max-width: 95%;
    max-width: 300px;
  }
}
</style>
