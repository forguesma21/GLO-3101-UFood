import { reactive, readonly } from "vue"
import Cookies from "js-cookie"

export const globalState = reactive({
  isLoggedIn: false,
  userId: null,
  userToken: Cookies.get("access_token") || null,
})
export const loginHandler = (userToken, expirationDate) => {
  console.log("date de fin2: " + expirationDate)
  if (expirationDate instanceof Date) {
    console.log("date valide")
  }
  globalState.isLoggedIn = true
  Cookies.set("access_token", userToken, { expires: expirationDate })
}

export const logoutHandler = () => {
  Cookies.remove("access_token")
  Cookies.remove("userId")
}

export const isAuthenticated = () => {
  if (Cookies.get("access_token")) {
    return true
  } else {
    return false
  }
}

export const useGlobalState = () => {
  return readonly(globalState)
}

export const useAuth = () => {
  let authentication = isAuthenticated()

  return {
    loginHandler,
    logoutHandler,
    authentication,
  }
}

export const printInfo = () => {
  console.log(`isLoggedIn : ${globalState.isLoggedIn} \n
                userId : ${globalState.userId} \n
                userToken : ${globalState.userToken}`)
}
