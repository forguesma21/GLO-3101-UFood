import { createApp } from "vue"
import { router } from "./router/routes"
import App from "./App.vue"
import "./App.css"

// Vuetify
import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

// google api
import Vue3GoogleMap from "vue3-google-map"
import VueGoogleMaps from "@fawmi/vue-google-maps"

// axios
import axios from "axios"
import VueAxios from "vue-axios"

import "@mdi/font/css/materialdesignicons.css"

const app = createApp(App)

app.use(VueAxios, axios)
app.use(router)

const vuetify = createVuetify({
    components,
    directives,
})
app.use(vuetify)

app.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyDYM8pDcYfbqXeljkwuhMcvpfZTaDzNlI8",
    },
    libraries: "places",
})
app.use(Vue3GoogleMap)

app.mount("#app")
