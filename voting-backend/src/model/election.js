const mongoose = require("mongoose");

// Election Schema
const ElectionSchema = new mongoose.Schema({
  startTime: { type: Date },
  endTime: { type: Date },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }],
});

const ElectionModel = mongoose.model("Election", ElectionSchema);
module.exports = ElectionModel;
