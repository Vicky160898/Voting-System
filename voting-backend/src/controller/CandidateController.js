const CandidateModel = require("../model/candidate");
const ElectionModel = require("../model/election");

const { faker } = require("@faker-js/faker");
//adding the candidate here..
const getCandidate = async (req, res) => {
  try {
    const newCandidates = Array.from({ length: 2 }, () => ({
      name: faker.internet.userName(),
      avatar: faker.image.avatar(),
    }));
    const candidates = await CandidateModel.insertMany(newCandidates); // Assuming your model expects an array of candidates

    return res.status(201).json({ success: true, data: candidates });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
};

// this will add single candidate to election if exist or will create new election
const addCandidateToElection = async (req, res) => {
  try {
    const { candidateId, electionId } = req.body;
    const candidate = await CandidateModel.findById({ _id: candidateId });

    let election = await ElectionModel.findById(electionId);

    if (!election) {
      election = await ElectionModel.create({ candidates: [candidate] });

      return res.status(201).json({ success: true, data: candidate });
    } else {
      const isCandidateInElection = election.candidates.filter(
        (c) => c._id === candidateId
      );

      if (isCandidateInElection && isCandidateInElection[0]) {
        return res
          .status(401)
          .json({ error: "candidate already in current election" });
      }

      //add to election
      election.candidates.push(candidate);

      await election.save();

      return res.status(201).json({ success: true, data: candidate });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = { getCandidate, addCandidateToElection };
