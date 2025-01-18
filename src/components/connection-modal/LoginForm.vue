<template>
  <form @submit.prevent class="login-form">
    <div class="form-group">
      <div class="group-group">
        <v-responsive class="mx-auto" max-width="344">
          <v-text-field
            v-model="email"
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
    </div>

    <div class="checkbox-group">
      <input id="remember-checkbox" type="checkbox" />
      <label class="remember-label"> Remember me? </label>
    </div>
    <div class="button-group">
      <button
        class="submit-button"
        type="submit"
        :disabled="email === '' && password === ''"
        @click="loginEvent"
      >
        Log in
      </button>
    </div>
  </form>
</template>

<script setup>
import { login } from "@/services/connectionAPI"
import { loginHandler } from "@/store/auth.js"
import { setTokenExpirationDate } from "@/components/connection-modal/connection-utils.js"
import Cookies from "js-cookie"
import { getCurrentInstance, ref } from "vue"

const email = ref("")
const password = ref("")
const instance = getCurrentInstance()
const visible = ref(false)

const passwordRules = ref([(value) => !!value || "Password is required"])
const emailRules = ref([
  (value) => !!value || "Email is required",
  (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || "Invalid email format"
  },
])

const loginEvent = async () => {
  try {
    const res = await login(email.value, password.value)
    var checkbox = document.getElementById("remember-checkbox")
    const expiration = setTokenExpirationDate(checkbox.checked)
    console.log("date d'expiration: " + expiration)
    loginHandler(res.token, expiration)

    Cookies.set("access_token", res.token)
    Cookies.set("userId", res.id)
    location.reload()
    console.log("Cookie has been set : ", Cookies.get("access_token"))
    instance.emit("login-successful")
  } catch (error) {
    console.log("LoginForm : Error with loginEvent()", error)
    instance.emit("error", "Mot de passe ou email invalide")
  }
}
</script>

<style>
.input-field {
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  height: 40px;
  width: 60%;
  margin-top: 10px;
}

.login-form {
  margin-top: 1.5rem;
  text-align: center;
  width: 100%;
  position: relative;
}

.checkbox-group {
  text-align: center;
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
