const express = require("express");
const {
  getCandidate,
  addCandidateToElection,
} = require("../controller/CandidateController");

const router = express.Router();

router.get("/generate", getCandidate);
router.post("/add", addCandidateToElection);

module.exports = router;
