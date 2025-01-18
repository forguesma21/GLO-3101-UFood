<template>
  <div class="container">
    <v-breadcrumbs
      :items="breadcrumbs"
      style="margin-top: 40px; margin-left: 15px"
    ></v-breadcrumbs>
    <ListPage v-if="listData && userId" :listData="listData" :userId="userId" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import { getListById } from "@/services/favoriteAPI"
import ListPage from "@/components/list-page/ListPage.vue"

const route = useRoute()
const listData = ref(null)
const listId = ref(null)
const userId = ref(null)

listId.value = route.params.id

onMounted(async () => {
  listData.value = await getListById(listId.value)
  userId.value = await listData.value.owner.id
})

const breadcrumbs = computed(() => {
  const items = [
    {
      title: "User's profile",
      disable: false,
      to: "/profile/" + userId.value,
    },
  ]

  if (listData.value) {
    items.push({
      title: listData.value.name,
      disable: true,
    })
  }
  return items
})
</script>
