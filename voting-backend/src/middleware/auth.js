const VoterModel = require("../model/voter");

const LoginVoter = async (req, res) => {
  const { ID } = req.body;

  const admin = "admin@1234";

  if (admin === ID) {
    // Check if admin ID already exists in the database
    const adminExists = await VoterModel.exists({ voterID: ID });

    if (adminExists) {
      return res.status(201).json({
        isAdmin: true,
        voterID: ID,
        message: "Vote cast successfully",
      });
    } else {
      const newUser = new VoterModel({
        voterID: ID,
      });

      await newUser.save();
      return res.status(201).json({
        isAdmin: true,
        voterID: ID,
        message: "Vote cast successfully",
      });
    }
  }

  try {
    const voter = await VoterModel.findOne({ voterID: ID });

    if (!voter._id) {
      return res.status(400).json({ msg: "Invalid Voter ID" });
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
