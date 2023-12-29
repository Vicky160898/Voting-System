const ElectionModel = require("../model/election");
const VoterModel = require("../model/voter");
const { faker } = require("@faker-js/faker");

const createVoter = async (req, res) => {
  try {
    const newUser = new VoterModel({
      voterID: faker.string.uuid(), // Use faker.random.uuid() to generate a UUID
    });
    await newUser.save();

    return res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "An error occurred",
    });
  }
};

const getVoter = async (req, res) => {
  const { voterid } = req.params;

  try {
    const voter = await VoterModel.findOne({ voterID: voterid });
    if (!voter._id) {
      return res.status(404).json({ success: false, error: "invalid id" });
    }
    return res.status(200).json({ success: true, data: voter });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "An error occurred",
    });
  }
};

const postVote = async (req, res) => {
  try {
    const { voterId, candidateId, electionId } = req.body;

    const voter = await VoterModel.findOne({ voterID: voterId });
    if (!voter) {
      return res.status(404).json({ error: "Voter not found" });
    }

    const hasVotedInThisElection = voter.votes.some(
      (v) => v.election.toString() === electionId
    );

    if (hasVotedInThisElection) {
      return res.status(400).json({ error: "Already voted in this election" });
    }

    const election = await ElectionModel.findById(electionId);
    if (!election) {
      return res.status(404).json({ error: "Election not found" });
    }

    const candidate = election.candidates.find(
      (candidate) => candidate._id.toString() === candidateId
    );
    if (!candidate) {
      return res
        .status(404)
        .json({ error: "Candidate not found for given election id" });
    }

    voter.votes.push({
      election: election,
      candidate: candidate,
    });

    await voter.save();

    res.status(200).json({ message: "Vote cast successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to cast vote" });
  }
};

module.exports = { createVoter, getVoter, postVote };
