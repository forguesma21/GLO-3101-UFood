<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024" activator="parent">
      <v-card>
        <v-card-text>
          <v-container>
            <div class="modal-title">
              Add a visit from {{ restaurantData.name }}
            </div>
            <v-row>
              <v-col cols="10">
                <p>Rating</p>
                <v-slider
                  v-model="rating"
                  max="5"
                  :step="1"
                  show-ticks="always"
                  thumb-label="hover"
                  tick-size="4"
                  color="var(--orange)"
                >
                </v-slider>
              </v-col>

              <v-col cols="10">
                <p>Review</p>
                <v-textarea
                  v-model="comment"
                  label=""
                  variant="outlined"
                ></v-textarea>
              </v-col>

              <v-col cols="10">
                <p>Date</p>

                <v-text-field v-model="date" type="Date"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeModal">
            Close
          </v-btn>
          <v-btn
            v-if="restaurantData"
            color="blue-darken-1"
            variant="text"
            @click="submitVisit"
          >
            Submit a visit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue"
import { postUserVisit, getTokenInfo } from "@/services/userAPI"

const dialog = ref(true)
const rating = ref(0)
const comment = ref("")
const date = ref("")

const formatDate = (dateString) => {
  const dateObject = new Date(dateString)
  return dateObject.toISOString()
}

const props = defineProps({
  restaurantData: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(["closeModal"])

const closeModal = () => {
  emit("closeModal-emit")
}

const submitVisit = async () => {
  try {
    const userId = await getTokenInfo()
    const formattedDate = formatDate(date.value)

    const success = await postUserVisit(
      userId.id,
      props.restaurantData.id,
      comment.value,
      rating.value,
      formattedDate
    )

    dialog.value = false
  } catch (error) {
    console.error("Error submitting visit:", error)
  }
}
</script>

<style>
button.visit-button:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
button.visit-button {
  border: 2.5px solid;
  border-color: var(--orange);
}
button.bg-primary {
  --v-theme-overlay-multiplier: var(--v-theme-primary-overlay-multiplier);
  background-color: transparent !important;
  color: black !important;
}

.v-card-text {
  margin: 3rem;
}

.modal-title {
  font-size: 1.7rem;
  margin-bottom: 1.5rem;
  text-align: center;
}
.v-card-actions {
  margin: auto;
  gap: 1rem;
}

button.text-blue-darken-1 {
  color: var(--orange) !important;
}
</style>
