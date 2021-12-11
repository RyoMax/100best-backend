import express from "express"
import { loginPost, loginGet } from "../controller/loginController.js";
import loginValidator from "../validators/loginValidator.js";
import requiredValues from "../validators/requiredValues.js"
import errorValidationChecker from "../middleware/errorValidationChecker.js"

const router = express.Router()

router.post("/", [requiredValues(["username", "password"]), loginValidator(), errorValidationChecker()], loginPost)

router.get("/", loginGet)

export default router