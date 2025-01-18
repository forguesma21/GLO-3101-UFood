import Cookies from "js-cookie"

export const isAuthenticated = () => {
    console.log("Cookies: "+Cookies.get("access_token"))
    return Cookies.get("access_token") !== null && Cookies.get("access_token") != undefined
}
