<template>
  <v-dialog v-model="dialog" activator="parent">
    <v-card class="modal-parent">
      <div v-if="login" class="info-modal">
        <h2 class="modal-title">Sign Up</h2>
        <button id="Switch-Form-Btn" @click="toggleForm">
          Already have an account?
        </button>
      </div>
      <div v-else class="info-modal">
        <h2 class="modal-title">Log In</h2>
        <button
          id="Switch-Form-Btn"
          @click="toggleForm"
          style="color: var(--orange)"
        >
          No accounts? Sign up.
        </button>
      </div>
      <SignUpForm id="Signup-Form" v-if="login == true" />
      <LogInForm
        id="Login-Form"
        v-else
        @login-successful="handleLoginSuccess"
        @error="displayError('Mot de passe ou email invalide')"
      />
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <i
        class="bx bx-x x close-btn"
        block
        @click="dialog = false"
        style="cursor: pointer"
      ></i>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue"
import SignUpForm from "@/components/connection-modal/SignUpForm.vue"
import LogInForm from "@/components/connection-modal/LoginForm.vue"

const dialog = ref(false)
const login = ref(false)
const errorMessage = ref("")

const handleLoginSuccess = () => {
  dialog.value = false
  instance.emit("login-successful")
}

const toggleForm = () => {
  login.value = !login.value
}

const displayError = (message) => {
  errorMessage.value = message
}
</script>

<style scoped>
.info-modal > .modal-title {
  text-align: center;
  margin-bottom: 10px;
  text-align: center;
  margin-bottom: 10px;
}
#Switch-Form-Btn {
  color: var(--orange);
  color: var(--orange);
}
.modal-parent {
  width: 50rem;
  height: 30rem;
  align-self: center;
  gap: 1rem;
  width: 50rem;
  height: 30rem;
  align-self: center;
  gap: 1rem;
}
.modal-parent > .info-modal {
  display: flex;
  justify-content: center;
  flex-direction: column;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.btn-login {
  display: block;
  align-self: center;
  display: block;
  align-self: center;
}
.close-btn {
  position: absolute;
  right: 0;
  top: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.v-dialog > .v-overlay__content > .v-card {
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
}

@media screen and (max-width: 768px) {
  .modal-parent {
    width: 30rem;
  }
  .modal-parent {
    width: 30rem;
  }
}

@media screen and (max-width: 320px) {
  .modal-parent {
    width: 20rem;
  }
  @media screen and (min-width: 320px) {
    .modal-parent {
      width: 15rem;
    }
  }
  .modal-parent {
    width: 20rem;
  }
  @media screen and (min-width: 320px) {
    .modal-parent {
      width: 15rem;
    }
  }
}
.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
