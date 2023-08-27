const { Schema, model } = require("mongoose");

const candidateSchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  avatar: { type: String },
  votes: { type: Number, default: 0 },
});

const CandidateModel = model("Candidate", candidateSchema);
module.exports = CandidateModel;
