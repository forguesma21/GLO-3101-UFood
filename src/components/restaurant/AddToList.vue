<template>
  <div class="pa-4 text-center">
    <v-dialog width="auto">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="add-list"
          text="Add to list"
          color="primary"
          variant="outlined"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card
          title="Your lists"
          style="min-width: 20rem; width: 80%; max-width: 800px"
        >
          <v-divider class="mt-3"></v-divider>

          <div
            style="height: 300px; min-width: 80%; margin: 1rem"
            v-if="userLists.length"
          >
            <v-container v-for="(list, index) in userLists" :key="index" column>
              <v-checkbox
                style="font-weight: 600"
                v-model="selected"
                :disabled="listsContainingRestaurant.includes(list.id)"
                :label="list.name"
                :value="list.id"
              ></v-checkbox>
            </v-container>
          </div>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn text="Close" @click="isActive.value = false"></v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="surface-variant"
              text="Save"
              variant="flat"
              @click="addRestaurantToLists"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { getUserLists } from "@/services/userAPI"
import { ref, onMounted, defineProps, nextTick } from "vue"
import Cookies from "js-cookie"
import { postRestaurantToUserList } from "@/services/favoriteAPI"

const dialog = ref(false)
const userLists = ref([])
const selected = ref([])
const listsContainingRestaurant = ref([])
const snackbar = ref({ show: false, text: "", color: "success", timeout: 3000 })

const props = defineProps({
  restaurantId: {
    type: String,
    required: true,
  },
})

const loadUserLists = async () => {
  const userId = Cookies.get("userId")
  const dataFetched = await getUserLists(userId)
  userLists.value = dataFetched["items"]
  findListsContainingRestaurant()
}

const findListsContainingRestaurant = () => {
  listsContainingRestaurant.value = userLists.value.reduce((acc, list) => {
    const isFound = list.restaurants.some(
      (restaurant) => restaurant.id === props.restaurantId
    )
    if (isFound) acc.push(list.id)
    return acc
  }, [])
}

const addRestaurantToLists = async () => {
  if (selected.value.length === 0) {
    snackbar.value = {
      show: true,
      text: "No lists selected.",
      color: "error",
      timeout: 2000,
    }
    return
  }
  try {
    for (const listId of selected.value) {
      await postRestaurantToUserList(listId, props.restaurantId)
      console.log(`Restaurant added to list ${listId}`)
    }
    snackbar.value = {
      show: true,
      text: "Restaurant added successfully.",
      color: "success",
      timeout: 2000,
    }
    selected.value = []
    dialog.value = false
    isActive.value = false
  } catch (error) {
    console.error("Error adding restaurant to list:", error)
  }
}

const closeDialog = () => {
  dialog.value = false
  selected.value = []
}

onMounted(async () => {
  await nextTick()
  loadUserLists(Cookies.get("userId"))
})
</script>

<style scoped>
button.add-list:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
button.add-list {
  border: 2.5px solid;
  padding: 0.2rem 1rem;
  border-color: var(--orange);

  .v-btn__content {
    color: var(--orange) !important;
  }
  .v-btn__content {
    color: var(--orange) !important;
  }
}

button.text-blue-darken-1 {
  color: var(--orange) !important;
}

button.v-btn__content {
  color: var(--orange) !important;
}
</style>
