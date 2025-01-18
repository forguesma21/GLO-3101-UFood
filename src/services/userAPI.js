import { Cookie } from "lucide-vue-next"
import { api, secure_api } from "./api"
import Cookies from "js-cookie"

export const getUserInfo = async (userId) => {
  try {
    const response = await secure_api.get(`users/${userId}`, {
      headers: {
        Authorization: Cookies.get("access_token"),
      },
    })
    const userInfo = await response.data
    return userInfo
  } catch (error) {
    console.error(`Error fetching user with id : ${userId}`)
  }
}

export function getVisitedUserInfo() {
  const searchPath = window.location.pathname
  const userId = searchPath.substring(searchPath.lastIndexOf("/") + 1)
  return userId
}

// VISITS MANAGEMENT
// all visits from user
export const getVisitedRestaurants = async function (userId) {
  try {
    const response = await api.get(`users/${userId}/restaurants/visits`, {
      headers: {
        Authorization: Cookies.get("access_token"),
      },
    })
    const visitedRestaurants = await response.data
    return visitedRestaurants
  } catch (error) {
    console.error(`Error fetching user's visited restaurants`)
  }
}

// all visits from a specific restaurant
export const getRestaurantVisits = async function (userId, restaurant_id) {
  try {
    const response = await secure_api.get(
      `users/${userId}/restaurants/${restaurant_id}/visits`,
      {
        headers: {
          Authorization: Cookies.get("access_token"),
        },
      }
    )
    const restaurantVisits = await response.data
    return restaurantVisits
  } catch (error) {
    console.error(`Error fetching visits for restaurant_id`, error)
  }
}

export const postUserVisit = async function (
  userId,
  restaurantId,
  comment,
  rating,
  date
) {
  try {
    const response = await secure_api.post(
      `users/${userId}/restaurants/visits`,
      {
        restaurant_id: restaurantId,
        comment: comment,
        rating: rating,
        date: date,
      },
      {
        headers: {
          Authorization: Cookies.get("access_token"),
        },
      }
    )
  } catch (error) {
    console.error("Error while POST :", error)
  }
}

// LIST MANAGEMENT
export const getUserLists = async function (userId) {
  try {
    const response = await secure_api.get(`users/${userId}/favorites`, {
      headers: {
        Authorization: Cookies.get("access_token"),
      },
    })
    const userLists = await response.data
    return userLists
  } catch (error) {
    console.log(`Error fetching user's lists`)
  }
}

export const getTokenInfo = async function () {
  const token = Cookies.get("access_token")
  console.log(token)
  try {
    const response = await secure_api.get(`tokenInfo`, {
      headers: {
        Authorization: token,
      },
    })
    const userInfo = await response.data
    return userInfo
  } catch (error) {
    console.log(`Error fetching user's info`, error)
  }
}

export const getAllUsers = async function (
  limit = 10,
  page = 0,
  searchQuery = ""
) {
  try {
    let url = `/users?limit=${limit}&page=${page}`
    if (searchQuery !== "") {
      url += `&q=${searchQuery}`
    }

    const token = Cookies.get("access_token")

    const response = await secure_api.get(url, {
      headers: {
        Authorization: token,
      },
    })

    const allUser = await response.data
    return allUser.items
  } catch (error) {
    console.log(`Error fetching all user`)
    return []
  }
}
