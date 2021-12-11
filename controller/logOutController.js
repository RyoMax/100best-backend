import createError from "http-errors";

export const logOutDelete = async (req, res, next) => {
  try {
    res.clearCookie("adminUserCookie");
    console.log("------> Admin Log Out!")
    res.status(200).json("")
  }
  catch (error) {
    console.log(error)
    next(createError(401, "Error: Authorization failed. Please log in again"))
  }
}