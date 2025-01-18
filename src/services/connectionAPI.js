import { api, secure_api } from "./api"

export const login = async function (email, password) {
  try {
    const response = await secure_api.post(
      `login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    )
    const loginJSON = await response.data
    return loginJSON
  } catch (error) {
    console.log("Error while login", error)
  }
}

export const signUp = async function (name, email, password) {
  try {
    const response = await secure_api.post(
      "signup",
      {
        name: name,
        email: email,
        password: password,
      },
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    )
    return response
  } catch (error) {
    console.log("ERREUR: " + error)
  }
}
