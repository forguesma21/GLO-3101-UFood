<template>
  <div class="signup-form">
    <div class="form-group mx-auto">
      <div class="group-group">
        <v-responsive class="mx-auto" max-width="344">
          <v-text-field
            v-model="fullName"
            :rules="fullNameRules"
            placeholder="Full name"
            variant="underlined"
          ></v-text-field>

          <v-text-field
            v-model="userEmail"
            :rules="emailRules"
            placeholder="Email"
            variant="underlined"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            placeholder="Password"
            variant="underlined"
            :rules="passwordRules"
            @click:append-inner="visible = !visible"
          ></v-text-field>
        </v-responsive>
      </div>

      <div class="checkbox-group">
        <input id="remember-checkbox" type="checkbox" />
        <label class="remember-label"> Remember me? </label>
      </div>
      <div class="link-group">
        <span class="forgot-password-link">
          <a class="form-link">Forgot password?</a>
        </span>
      </div>
      <div class="form-group">
        <button class="submit-button" @click.prevent="signUpUser">
          Sign up
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { signUp, login } from "@/services/connectionAPI"
import { ref } from "vue"
import { loginHandler } from "@/store/auth.js"
import { setTokenExpirationDate } from "@/components/connection-modal/connection-utils.js"

const password = ref("")
const userEmail = ref("")
const fullName = ref("")
const checkboxOne = ref(false)
const visible = ref(false)

const fullNameRules = ref([
  (value) => !!value || "Full name is required",
  (value) => value.length >= 2 || "Full name must be at least 2 characters",
])
const passwordRules = ref([(value) => !!value || "Password is required"])
const emailRules = ref([
  (value) => !!value || "Email is required",
  (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || "Invalid email format"
  },
])

const signUpUser = async () => {
  try {
    const responseData = await signUp(
      fullName.value,
      userEmail.value,
      password.value
    )
    if (responseData) {
      const userResponseData = await login(userEmail.value, password.value)
      if (userResponseData) {
        const expiration = setTokenExpirationDate(checkboxOne.value)
        loginHandler(userResponseData.token, expiration)
        window.location.reload()
      }
    }
  } catch (error) {
    console.error("Signup failed:", error)
  }
}
</script>

<style>
.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  align-items: center;
}

.group-group {
  display: flex;
  width: 100%;
  align-content: center;
  align-items: center;
  margin: auto;
  margin-bottom: 1rem;
}
.input-field {
  border: none;
  outline: none;
  height: 40px;
  width: 60%;
  margin-top: 10px;
}

.signup-form {
  text-align: center;
  width: 100%;
  position: relative;
}

.checkbox-group {
  display: inline-block;
  text-align: left;
  width: 40%;
  height: 40px;
}

.remember-checkbox {
  display: inline;
  height: 15px;
  width: 15px;
  text-align: right;
}

.remember-label {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12px;
}

.forgot-password-link {
  display: inline-block;
  color: rgb(255, 126, 0);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
}

.submit-button {
  align-self: center;
  height: 40px;
  width: 60%;
  border-radius: 20px;
  border: none;
  background-color: var(--orange);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
}
</style>
