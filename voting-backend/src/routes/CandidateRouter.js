const express = require("express");
const {
  GetResult,
  PostVote,
  GetCandidate,
} = require("../controller/VotedController");

const router = express.Router();

router.get("/generate", GetCandidate);
router.post("/vote/:voterId/:candidateId", PostVote);
router.get("/results", GetResult);

module.exports = router;
