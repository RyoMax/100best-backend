import express from "express";

import {
  getAllLocations,
  postLocation,
  getCity,
  getCityAndYear,
  getEstablishmentData,
  updateEstablishmentData,
  deleteEstablishmentData,
} from "../controller/locationsController.js";
import errorValidationChecker from "../middleware/errorValidationChecker.js";
import requiredValues from "../validators/requiredValues.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//? ErrorValidationChecker() is here to avoid to repeat this function in all routes before Try and Catch.

router.use(checkAuth);

router.get("/", getAllLocations);
//router.post("/", [requiredValues(requiredLocations), errorValidationChecker()], postLocation)
router.post("/", [errorValidationChecker()], postLocation);

//   "/filter" was created inside the route because it was creating conflict with the dynamic :locationId
router.get("/filter/:city", getCity);
router.get("/filter/:city/:year", getCityAndYear);

router.get("/:locationId", getEstablishmentData);
router.put("/:locationId", updateEstablishmentData);
router.delete("/:locationId", deleteEstablishmentData);

export default router;
