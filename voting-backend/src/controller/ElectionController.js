const ElectionModel = require("../model/election");
const CandidateModel = require("../model/candidate");
const VoterModel = require("../model/voter");

const postStart = async (req, res) => {
  try {
    const { selectedCandidates, startTime, endTime } = req.body;

    if (!startTime || !endTime || selectedCandidates.length < 2) {
      return res.status(400).json({ error: "Invalid information provided." });
    }

    // Create a new election with start and end times
    const newElection = await ElectionModel.create({
      startTime,
      endTime,
      candidates: [], // Initialize with an empty array
    });

    if (!newElection) {
      return res.status(400).json({ error: "Election creation failed." });
    }

    // Update the newly created election with selectedCandidates array
    newElection.candidates = selectedCandidates;
    const updatedElection = await newElection.save();

    return res.status(200).json({ success: true, data: updatedElection });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const getAllResults = async (req, res) => {
  try {
    // Get all elections
    const elections = await ElectionModel.find().populate("candidates");

    const results = [];

    for (const election of elections) {
      const electionResult = {};

      for (const candidate of election.candidates) {
        try {
          let voteCount = 0;

          // Iterate through voters to count votes for this candidate in the current election
          const voters = await VoterModel.find({
            "votes.candidate": candidate._id,
          });

          for (const voter of voters) {
            const matchingVotes = voter.votes.filter(
              (vote) =>
                vote.election.toString() === election._id.toString() &&
                vote.candidate.toString() === candidate._id.toString()
            );
            voteCount += matchingVotes.length;
          }
          electionResult[candidate.name] = voteCount;
        } catch (error) {
          console.error("Error fetching votes:", error);
        }
      }

      results.push({ id: election._id, ...electionResult });
    }

    // Move the console.log outside of the loop
    console.log("name", results);

    // Return the results in the response
    return res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error("Internal error:", error);
    res.status(500).json({ error: "internal error" });
  }
};

const getOngoing = async (req, res) => {
  try {
    //ended elections
    const elections = await ElectionModel.find({
      start_time: { $lt: new Date() },
      end_time: { $gt: new Date() },
    });

    return res.status(200).json({ success: true, data: elections });
  } catch (error) {
    res.status(500).json({ error: "internal err" });
  }
};

const getUpcoming = async (req, res) => {
  try {
    const elections = await ElectionModel.find({
      start_time: { $gt: new Date() },
    });

    return res.status(200).json({ success: true, data: elections });
  } catch (error) {
    res.status(500).json({ error: "internal err" });
  }
};

const getAllEle = async (req, res) => {
  try {
    const elections = await ElectionModel.find().lean(); // Use lean() to convert Mongoose objects to plain JavaScript objects
    const populatedElections = await Promise.all(
      elections.map(async (election) => {
        const candidateIds = election.candidates; // Assuming candidates is the array of candidate IDs in your Election model
        const populatedCandidates = await CandidateModel.find({
          _id: { $in: candidateIds },
        }); // Find candidates with the specified IDs
        return { ...election, candidates: populatedCandidates }; // Replace candidate IDs with populated candidate details
      })
    );
    return res.status(200).json({ success: true, data: populatedElections });
  } catch (error) {
    res.status(500).json({ error: "internal err" });
  }
};

module.exports = {
  postStart,
  getAllResults,
  getOngoing,
  getUpcoming,
  getAllEle,
};
