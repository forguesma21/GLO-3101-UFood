import { secure_api } from "./api"
import Cookies from "js-cookie"

export const getRestaurants = async () => {
  try {
    const response = await secure_api.get("restaurants?limit=1000", {
      headers: {
        Authorization: Cookies.get("access_token"),
      },
    })
    const restaurantsJSON = await response.data
    return restaurantsJSON.items
  } catch (error) {
    console.error("Error fetching restaurants:", error)
  }
}

export const getRestaurantById = async function (restaurantId) {
  try {
    if (restaurantId) {
      const response = await secure_api.get(`restaurants/${restaurantId}`, {
        headers: {
          Authorization: Cookies.get("access_token"),
        },
      })
      const restaurantJSON = await response.data
      return restaurantJSON
    }
  } catch (error) {
    console.error(`Error fetching restaurant with ID ${restaurantId}:`, error)
  }
}

export const getRestaurantByGenre = async (filterKeys, filterValues) => {
  try {
    let URL = `restaurants?${filterKeys.map((u, index) => `${filterKeys[index]}=${filterValues[index]}`).join("&")}`
    const response = await secure_api.get(URL, {
      headers: {
        Authorization: Cookies.get("access_token"),
      },
    })
    const responseJSON = await response.data
    console.log("Le status : " + response.status)
    return responseJSON.items
  } catch (error) {
    console.error("Error getting restaurants : " + error)
    throw error
  }
}
