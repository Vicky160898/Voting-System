const express = require("express");
const {
  getUpcoming,
  getAllResults,
  getOngoing,
  postStart,
  getAllEle,
} = require("../controller/ElectionController");

const router = express.Router();

router.post("/start", postStart);
router.get("/results", getAllResults);
router.get("/ongoing", getOngoing);
router.get("/upcoming", getUpcoming);
router.get("/all", getAllEle);

module.exports = router;
