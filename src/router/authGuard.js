import { isAuthenticated } from "./utils"

export const navigationGuard = (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (isAuthenticated()) {
            next()
            return
        }
        next("/")
    } else {
        next()
    }
}
