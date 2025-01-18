import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home"
import Profile from "@/views/Profile"
import Restaurant from "@/views/Restaurant"
import List from "@/views/List"
import Cookies from "js-cookie"
import { authGuard } from "./authGuard"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: { isAuth: false },
    },
    {
        path: "/restaurant/:id",
        name: "Restaurant",
        component: Restaurant,
        meta: { isAuth: true },
    },
    {
        path: "/profile/:id",
        name: "Profile",
        component: Profile,
        meta: { isAuth: true },
    },
    {
        path: "/list/:id",
        name: "List",
        component: List,
        meta: { isAuth: true },
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.isAuth)) {
      const token = Cookies.get("access_token");
      if (!token) {
        console.log("Token");
        next({ name: 'Home' });
      } else {
        next();
      }
    } else {
      next();
    }
});
