const { Schema, model } = require("mongoose");

const VoterSchema = new Schema(
  {
    voterID: { type: String, required: true },
    votedCandidate: { type: Schema.Types.ObjectId, ref: "Candidate" },
  },
  {
    timestamps: true, // Adding createdAt and updatedAt fields
    versionKey: false, // Disabling versioning
  }
);

const VoterModel = model("Voter", VoterSchema);

module.exports = VoterModel;
