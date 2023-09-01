const VoterModel = require("../model/voter");

const LoginVoter = async (req, res) => {
  const { ID } = req.body;

  console.log("DATA received on Login ", JSON.stringify(req.body));

  const admin = "admin@1234";

  if (admin === ID) {
    return res.status(200).json({ isAdmin: true });
  }

  try {
    const voter = await VoterModel.findOne({ voterID: ID });

    if (!voter._id) {
      return res.status(400).json({ msg: "Invlid Voter ID" });
    }

    return res.status(201).json({ success: true, data: voter });
  } catch (error) {
    console.error("Error creating user:", error); // Log the actual error for debugging
    return res.status(500).json({ success: false, error: "An error occurred" });
  }
};

module.exports = {
  LoginVoter,
};
