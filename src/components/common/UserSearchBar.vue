<template>
  <div class="user-search-bar" ref="searchBarRef">
    <i class="bx bx-search"></i>
    <input
      type="text"
      v-model="searchQuery"
      @input="search"
      placeholder="Search users or restaurant..."
    />
    <ul v-if="searchResults">
      <li
        v-for="result in searchResults"
        :key="result.id"
        @click="selectResult(result)"
      >
        {{
          result.type === "user"
            ? `${result.name}, User`
            : `${result.name}, Restaurant`
        }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { getAllUsers } from "@/services/userAPI"
import { getRestaurants } from "@/services/restaurantAPI"

const searchQuery = ref("")
const searchResults = ref([])
const searchBarRef = ref(null)

const search = async () => {
  if (searchQuery.value.trim() !== "") {
    try {
      const users = await getAllUsers(10, 0, searchQuery.value)
      const restaurants = await getRestaurants(10, 0, searchQuery.value)

      const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )

      const formattedUsers = users.map((user) => ({ ...user, type: "user" }))
      const formattedRestaurants = filteredRestaurants.map((restaurant) => ({
        ...restaurant,
        type: "restaurant",
      }))

      searchResults.value = [...formattedUsers, ...formattedRestaurants]
    } catch (error) {
      console.error("Error searching:", error)
    }
  } else {
    searchResults.value = []
  }
}

const selectResult = (result) => {
  if (result.type === "user") {
    window.location = `/profile/${result.id}`
  } else {
    window.location = `/restaurant/${result.id}`
  }
}

const handleClickOutside = (event) => {
  if (!searchBarRef.value.contains(event.target)) {
    searchResults.value = []
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside)
})
</script>

<style scoped>
.user-search-bar {
  display: flex;
  align-items: center;
  width: 400px;
  border-radius: 20px;
  height: 45px;
  box-shadow: inset 0 12px 40px -16px rgba(0, 0, 0, 0.1);
  column-gap: 0.3rem;
  padding: 15px;
  font-size: var(--normal-font-size);
  position: relative;
}

input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
}

ul {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 5px 5px;
  list-style: none;
  padding: 0;
  border-bottom: none;
}

li {
  padding: 0.5rem;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}
.bx-search {
  font-size: 25px;
}
</style>
