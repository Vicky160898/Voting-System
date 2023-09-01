const express = require("express");
const { createVoter, postVote } = require("../controller/Votercontroller");
const { LoginVoter } = require("../middleware/auth");

const router = express.Router();

router.get("/create", createVoter);
router.post("/login", LoginVoter);
router.post("/vote", postVote);

module.exports = router;
