import { secure_api } from "./api"
import Cookies from "js-cookie"

// à modifier pour le livrable3 : enlever le owner
export const createList = async function (list_name, owner) {
  try {
    const response = await secure_api.post(
      `favorites`,
      {
        name: list_name,
        owner: owner,
      },
      {
        headers: {
          Authorization: Cookies.get("access_token"),
        },
      }
    )
    console.log("POST:", response.data)
  } catch (error) {
    console.error("Error while creating a list ;", error)
  }
}

export const getListById = async function (listId) {
  try {
    const response = await secure_api.get(`favorites/${listId}`, {
      headers: {
        Authorization: Cookies.get("access_token"),
      },
    })
    const listJSON = await response.data
    return listJSON
  } catch (error) {
    console.error(`Error fetching list with ID ${restaurantId}:`, error)
  }
}

// POST /favorites/:id/restaurants
// livrable 3 : get le token selon le user de manière dynamique
export const postRestaurantToUserList = async function (listId, restaurantId) {
  try {
    const response = await secure_api.post(
      `favorites/${listId}/restaurants`,
      {
        id: restaurantId,
      },
      {
        headers: {
          Authorization: Cookies.get("access_token"),
        },
      }
    )

    const listJSON = await response.data
    return listJSON
  } catch (error) {
    console.log("Error with postRestaurantToUserList", error)
  }
}

export const deleteRestaurantList = async function (listId) {
  try {
    const response = await secure_api.delete(`favorites/${listId}`, {
      headers: {
        Authorization: Cookies.get("access_token"),
      },
    })
  } catch (error) {
    console.log("Error with deleteRestaurantList", error)
  }
}

export const deleteFromList = async function (restaurantId, listId) {
  try {
    const response = await secure_api.delete(
      `favorites/${listId}/restaurants/${restaurantId}`,
      {
        headers: {
          Authorization: Cookies.get("access_token"),
        },
      }
    )
  } catch (error) {
    console.log("deleteFromList - ", error)
  }
}

export const editList = async function (listId, newName, owner) {
  try {
    const response = await secure_api.put(
      `favorites/${listId}`,
      {
        name: newName,
        owner: owner,
      },
      {
        headers: {
          Authorization: Cookies.get("access_token"),
        },
      }
    )
    return response.data
  } catch (error) {
    console.log("editList : ", error)
  }
}
