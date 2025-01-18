<template>
  <div class="search-bar">
    <i class="bx bx-search"></i>
    <input @input="handleSearch" class="search-input" type="search" placeholder="Search" />
  </div>
</template>

<script>
export default {
  computed: {
    shouldShowAutocomplete() {
      return window.innerWidth > 320;
    },
  },
  methods: {
    handleSearch(event) {
      let searchInput = event.target.value;
      this.$emit("search", searchInput);
    },
  },
};
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  width: 400px;
  border-radius: 20px;
  height: 45px;
  box-shadow: inset 0 12px 40px -16px rgba(0, 0, 0, 0.1);
  column-gap: 0.3rem;
  padding: 15px;
  font-size: var(--normal-font-size);
}
.search-input {
  width: 96%;
  height: 45px;
  border-radius: 10%;
  border: none;
  outline: none;
  margin: 8px;
  background-color: transparent;
}
.bx-search {
  font-size: 25px;
}
</style>
