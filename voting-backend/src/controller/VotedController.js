const VotedCandidateModel = require("../model/candidate");
const VoterModel = require("../model/voter");
const { faker } = require("@faker-js/faker");
//adding the candidate here..
const GetCandidate = async (req, res) => {
  try {
    const newCandidates = Array.from({ length: 6 }, () => ({
      id: faker.string.uuid(),
      name: faker.internet.userName(),
      avatar: faker.image.avatar(),
    }));
    console.log(newCandidates);
    const newUser = new VotedCandidateModel({ candidates: newCandidates }); // Assuming your model expects an array of candidates
    await newUser.save();
    // Combine the generated candidates with the MongoDB _id
    const candidatesWithIds = newCandidates.map((candidate, index) => ({
      _id: candidate._id,
      id: candidate.id, // Include the generated id
      name: candidate.name, // Include the generated name
      avatar: candidate.avatar,
    }));

    return res.status(201).json(candidatesWithIds);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

// Cast a vote
const PostVote = async (req, res) => {
  try {
    const { voterId, candidateId } = req.params;
    const voter = await VoterModel.findById(voterId);
    if (!voter) {
      return res.status(404).json({ error: "Voter not found" });
    }

    const candidate = await VotedCandidateModel.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    if (voter.votedCandidate) {
      return res.status(400).json({ error: "Voter has already voted" });
    }

    // Update the voter's votedCandidate field
    VoterModel.votedCandidate = candidateId;
    await VoterModel.save();

    // Increment the candidate's vote count
    VotedCandidateModel.votes += 1;
    await VotedCandidateModel.save();

    res.status(200).json({ message: "Vote cast successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to cast vote" });
  }
};

// Get election results
const GetResult = async (req, res) => {
  try {
    const candidates = await VotedCandidateModel.find().sort({ votes: -1 });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch results" });
  }
};

module.exports = { PostVote, GetResult, GetCandidate };
