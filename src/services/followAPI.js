import { secure_api } from "./api"
import Cookies from "js-cookie"

// follow user
export const followUser = async function (userToFollowId) {
  try {
    const response = await secure_api.post(
      `follow`,
      {
        id: userToFollowId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("access_token")
        },
      }
    )
    const followJSON = await response.data
    console.log("FollowAPI - POST : ", followJSON)
    return followJSON
  } catch (error) {
    console.error("Error while trying to follow a user ;", error)
  }
}

// unfollow user
export const unfollowUser = async function (userToUnfollowId) {
  try {
    const response = await secure_api.delete(`follow/` + userToUnfollowId, {
      headers: { 
        Authorization: Cookies.get("access_token")
      },
    })
    const unfollowJSON = await response.data
    return unfollowJSON
  } catch (error) {
    console.log("Error while trying to unfollow a user : ", error)
  }
}
