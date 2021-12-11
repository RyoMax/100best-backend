import createError from "http-errors";
import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  try {
    //const currentTime = Math.ceil(new Date().getTime() / 1000)
    console.log("current cookie", req.cookies.adminUserCookie);
    //const token = req.headers.authorization.split(" ")[1]
    let token = req.cookies.adminUserCookie;
    if (!token) {
      console.log(token);
      throw new Error("Auth failed!");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    //? refresh the expiry date of the cookie
    token = jwt.sign({ userId: decodedToken.userId }, process.env.JWT_KEY, {
      expiresIn: "1000min",
    });

    res.cookie("adminUserCookie", token, {
      httpOnly: true,
      sameSite: "Strict",
    });
    req.adminUserId = decodedToken.userId;
    console.log("req.adminUserId", req.adminUserId);
    next();
  } catch (error) {
    console.log(error);
    next(createError(401, "Error: Authorization failed. Please try again"));
  }
};

export default checkAuth;
