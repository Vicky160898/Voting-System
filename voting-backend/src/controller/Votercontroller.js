const VoterModel = require("../model/voter");
const { faker } = require("@faker-js/faker");

const Voter = async (req, res) => {
  try {
    const newUser = new VoterModel({
      // name: faker.internet.userName(),
      voterID: faker.string.uuid(), // Use faker.random.uuid() to generate a UUID
    });
    console.log(newUser);

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error); // Log the actual error for debugging
    res.status(500).json({ error: "An error occurred" });
  }
};

const LoginVoter = async (req, res) => {
  const { ID } = req.body;
  const admin = "193bff1b-d87c-4d75-9ccb-38705b18d9fd";
  console.log("ID", ID);
  try {
    const CheckID = await VoterModel.findOne({ voterID: ID });
    if (CheckID) {
      res.status(400).json({ msg: "Invlid Voter ID" });
    }
    if (admin === ID) {
      return res.status(200).json({ isAdmin: true, CheckID });
    }
    return res.status(201).json(CheckID);
  } catch (error) {
    console.error("Error creating user:", error); // Log the actual error for debugging
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = { Voter, LoginVoter };
