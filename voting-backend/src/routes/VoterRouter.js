const express = require("express");
const { Voter, LoginVoter } = require("../controller/Votercontroller");

const router = express.Router();

router.get("/create", Voter);
router.post("/login", LoginVoter);

module.exports = router;
