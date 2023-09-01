const mongoose = require("mongoose");

// Voter Schema
const VoterSchema = new mongoose.Schema({
  voterID: { type: String, required: true },
  votes: [
    {
      election: { type: mongoose.Schema.Types.ObjectId, ref: "Election" },
      candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
    },
  ],
});

const VoterModel = mongoose.model("Voter", VoterSchema);
module.exports = VoterModel;
