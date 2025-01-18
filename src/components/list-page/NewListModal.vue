<template>
  <div class="text-center">
    <div v-if="isCurrentUser()" class="new-list-button">
      Create a new list
      <v-dialog v-model="dialog" activator="parent" class="modal-visit">
        <form @submit.prevent="onSubmit">
          <v-card>
            <v-text-field
              v-model="name"
              style="margin: 10px"
              :rules="[required]"
              :readonly="loading"
              :counter="20"
              label="Choose a name for your list"
              required
              hide-details
            ></v-text-field>

            <v-card-actions>
              <v-btn
                color="primary"
                block
                @click="submitList"
                :loading="loading"
                type="submit"
                :disabled="name === '' || loading"
                >Create a new list</v-btn
              >
            </v-card-actions>
          </v-card>
        </form>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { createList } from "@/services/favoriteAPI"
import Cookies from "js-cookie"
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      name: "",
    }
  },
  props: {
    userInfo: null,
  },
  methods: {
    isCurrentUser() {
      const id = this.$route.path.replace("/profile/", "")
      const connectedUserId = Cookies.get("userId")
      if (connectedUserId == id && connectedUserId != null) {
        return true
      }
      return false
    },
    onSubmit() {
      if (!this.form) return

      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
    required(v) {
      return !!v || "Field is required"
    },
    async submitList() {
      const name = this.name
      const userEmail = this.userInfo.email

      await createList(name, userEmail)
      this.$emit("listSubmitted")

      this.dialog = false
    },
  },
}
</script>

<style>
.new-list-button {
  width: min-content;
  background-color: #ff7e00;
  border-radius: 25px;
  color: white;
  font-size: var(--normal-font-size);
  text-wrap: nowrap;
  align-self: center;
  padding: 5px 10px 5px 10px;
}
.new-list-button:hover {
  cursor: pointer;
}
.modal-visit {
  width: 50%;
}

/* responsive typo */
@media screen and (max-width: 992px) {
}

/* Tablets */
@media screen and (max-width: 768px) {
}

/* Mobile devices */
@media screen and (max-width: 425px) {
  .modal-visit {
    width: 100%;
  }
}
</style>
