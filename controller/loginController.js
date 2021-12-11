import createError from "http-errors";
import AdminUser from "../models/AdminUser.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const validUsers = [
  "bshr_faust@web.de",
  "tk.jalejandro@gmail.com",
  "yulia.schulte@gmail.com",
];

export const loginPost = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log("username", username);
    let currentUser = await AdminUser.findOne({ username: username });

    if (!currentUser) {
      let validUser;

      validUsers.forEach((user) => {
        if (user === username) {
          validUser = user;
        }
      });

      if (!validUser) {
        next(createError(403, "You are not authorized to login"));
      } else {
        const encryptedPassword = await bcrypt.hash(password, 12);

        currentUser = new AdminUser({
          username: username,
          password: encryptedPassword,
        });

        await currentUser.save();
        console.log("currentUser", currentUser); //CONSOLE doesn't work

        const token = jwt.sign(
          { userId: currentUser.id },
          process.env.JWT_KEY,
          { expiresIn: "1000min" }
        );

        res.cookie("adminUserCookie", token, {
          httpOnly: true,
          sameSite: "Strict",
        });
        res.status(201).json(currentUser._id);
      }
    } else {
      const isValidPassword = await bcrypt.compare(
        password,
        currentUser.password
      );

      if (!isValidPassword) {
        next(createError(403, "You are not authorized to login"));
      } else {
        const token = jwt.sign(
          { userId: currentUser.id },
          process.env.JWT_KEY,
          { expiresIn: "1000min" }
        );

        res.cookie("adminUserCookie", token, {
          httpOnly: true,
          sameSite: "Strict",
        });

        res.status(200).json(currentUser._id);
      }
    }
  } catch (error) {
    console.log(error);
    next(createError.InternalServerError());
  }
};

export const loginGet = async (req, res, next) => {
  try {
    const token = req.cookies.adminUserCookie;
    console.log(token);
    if (!token) res.json("");
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    res.json(decodedToken.userId);
  } catch (error) {
    console.log(error);
    next(createError(401, "Error: Authorization failed. Please log in again"));
  }
};
