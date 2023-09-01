const { Schema, model, default: mongoose } = require("mongoose");

// Candidate Schema
const CandidateSchema = new Schema({
  name: { type: String },
  party: { type: String },
  avatar: { type: String },
  election: { type: mongoose.Schema.Types.ObjectId, ref: "Election" },
});

const CandidateModel = model("Candidate", CandidateSchema);
module.exports = CandidateModel;
