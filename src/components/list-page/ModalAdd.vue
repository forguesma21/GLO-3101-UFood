<template>
  <div class="restaurant-card" v-if="restaurantsData">
    <img class="restaurant-img" alt="img" :src="restaurantsData.pictures[0]" />

    <div class="img-title">
      <p class="restaurant-subtitle">40 mins</p>
      <i class="bx bxs-plus-circle" @click="dialog = true"></i>
    </div>
    <p class="restaurant-name">{{ restaurantsData.name }}</p>

    <!-- dialog add to list-->
    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card
        prepend-icon="mdi-map-marker"
        text="Do you want to add this restaurant to the current list?"
        :title="restaurantsData.name"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialog = false"> Disagree </v-btn>

          <v-btn @click="addRestaurant"> Agree </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue"
import { postRestaurantToUserList } from "@/services/favoriteAPI"

const dialog = ref(false)

const props = defineProps({
  restaurantsData: {
    type: Object,
    required: true,
  },
  listId: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(["restaurant-added"])

const addRestaurant = async () => {
  try {
    await postRestaurantToUserList(props.listId, props.restaurantsData.id)
    emit("restaurant-added", props.restaurantsData.id)
    dialog.value = false
  } catch (error) {
    console.log("Error : ", error)
  }
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
    width: 246px;
  }
  .restaurant-name {
    line-height: 28px;
  }
}
@media screen and (max-width: 320px) {
  .restaurant-card {
    margin: 10px;
    height: 325px;
    width: 149px;
  }
  .restaurant-name {
    line-height: 28px;
  }
}

.v-slide-group__next,
.v-slide-group__prev {
  min-width: 30px !important;
}
</style>
