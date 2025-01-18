<template>
  <div>
    <RestaurantPage :restaurantData="restaurantData" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getRestaurantById } from '@/services/restaurantAPI'
import RestaurantPage from '@/components/restaurant/RestaurantPage.vue'

export default {
  components: {
    RestaurantPage,
  },
  setup() {
    const route = useRoute()
    const restaurantData = ref(null)
    const restaurantId = ref(null)

    restaurantId.value = route.params.id

    onMounted(async () => {
      restaurantData.value = await getRestaurantById(restaurantId.value)
    })

    return { restaurantData }
  },
}
</script>
