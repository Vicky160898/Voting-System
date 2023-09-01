require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const VoterRouter = require("./src/routes/VoterRouter");
const VotedRouter = require("./src/routes/CandidateRouter");
const ElectionRouter = require("./src/routes/ElectionRouter");
const connect = require("./src/config/db");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);

//routes here...
app.use("/api", VoterRouter);
app.use("/api/candidate", VotedRouter);
app.use("/api/election", ElectionRouter);

connect();
app.listen(PORT, () => {
  console.log(`server started on Port ${PORT}`);
});
