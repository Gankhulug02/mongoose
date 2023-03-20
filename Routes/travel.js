const express = require("express");

const {
  createTravel,
  getTravels,
  getTravel,
  updateTravel,
  deleteTravel,
} = require("../controller/Travel");

const router = express.Router();

router.route("/").post(createTravel).get(getTravels);
router.route("/:id").get(getTravel).put(updateTravel).delete(deleteTravel);

module.exports = router;
