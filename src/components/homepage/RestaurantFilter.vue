<template>
  <div class="container filter">
    <div class="adress-section">
      <i class="bx bxs-map" style="margin-right: 1rem; font-size: 30px"></i>
      <p>123 Rue de l'Exemple, Ville, Pays</p>
    </div>

    <SearchBar @search="filterRestaurants" class="search-bar" />

    <div class="select-section">
      <v-select
        clearable
        label="Genre"
        :items="genres"
        variant="outlined"
        class="select"
        rounded="3"
        @update:modelValue="genreChanged"
      ></v-select>

      <v-select
        clearable
        label="Price"
        :items="price_range"
        variant="outlined"
        class="select"
        rounded="3"
        @update:modelValue="priceChanged"
      ></v-select>

      <v-select
        clearable
        label="Rating"
        :items="rating"
        variant="outlined"
        class="select"
        rounded="3"
        @update:modelValue="ratingChanged"
      ></v-select>
    </div>
        <div>
            <v-btn-toggle
                v-model="toggle"
                color="primary"
                @update:modelValue="changeRestaurantView"
                mandatory
            >
                <v-btn value="list">List</v-btn>
                <v-btn value="map">Map</v-btn>
            </v-btn-toggle>
        </div>
  </div>
</template>

<script>
import SearchBar from "../common/SearchBar.vue"

export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      selectedGenre: "",
      selectedPrice: "",
      selectedRating: "",
            toggle: 'list',
    }
  },
  props: {
    genres: {
      type: Array,
    },
    price_range: {
      type: Array,
    },
    rating: {
      type: Array,
    },
  },
  methods: {
    genreChanged(genre) {
      if (genre == null) {
        this.selectedGenre = ""
      } else {
        this.selectedGenre = genre
      }
      this.returnChanges()
    },
    priceChanged(price) {
      if (price == null) {
        this.selectedPrice = ""
      } else {
        this.selectedPrice = price
      }

      this.returnChanges()
    },
    ratingChanged(rating) {
      if (rating == null) {
        this.selectedRating = ""
      } else {
        this.selectedRating = rating
      }
      this.returnChanges()
    },
    returnChanges() {
      let filtersArray = []
      let filtersKeys = []
      if (this.selectedGenre !== "" && this.selectedGenre !== null) {
        filtersArray.push(this.selectedGenre)
        filtersKeys.push("genres")
      }
      if (this.selectedPrice !== "" && this.selectedPrice !== null) {
        filtersArray.push(this.selectedPrice)
        filtersKeys.push("price")
      }
      if (this.selectedRating !== "" && this.selectedRating !== null) {
        filtersArray.push(this.selectedRating)
        filtersKeys.push("price")
      }
      this.$emit("filter-changed", filtersKeys, filtersArray)
    },
    changeRestaurantView(state) {
        this.$emit("view-changed", state)
    },
    filterRestaurants(searchInput) {
        this.$emit("search", searchInput)
    }
  },
}
</script>

<style>
.container.filter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  margin-bottom: 5rem;
  gap: 25px;
}
.adress-section {
  display: flex;
  flex-wrap: nowrap;
}
.dropdown {
  position: relative;
}
.select-section {
  display: flex;
  column-gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}
.select {
  width: 200px;
}
.v-field.v-field--appended {
  border-radius: 24px;
}
.v-select .v-field.v-field {
  color: var(--orange);
}

@media screen and (max-width: 425px) {
  .user-search-bar {
    width: 98% !important;
  }
}
</style>

<style scoped>
.search-bar {
  width: 90%;
  max-width: 670px;
}
</style>
