import express from "express"
import { logOutDelete } from "../controller/logOutController.js";

const router = express.Router()

router.delete("/", logOutDelete)

export default router