const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }],
});

const ElectionModel = mongoose.model("Election", electionSchema);
module.exports = ElectionModel;
