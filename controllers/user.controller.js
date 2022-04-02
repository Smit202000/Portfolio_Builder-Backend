const User = require("../models/user");

const register = async (req, res) => {
  console.log("here");
  try {
    const addinguserRecords = new User(req.body);
    const insert = await addinguserRecords.save();
    console.log('Registration Successful');
    res.send(insert)
  } catch (e) {
    res.status(400).send(e);
  }
}

const update = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["firstname", "lastname", "username", "email"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid updates!",
    });
  }

  try {
    updates.forEach((update) => (req.userModel[update] = req.body[update]));
    await req.userModel.save();
    res.send(req.userModel);
  } catch (e) {
    res.status(400).send(e);
  }
};

const remove = async (req, res) => {
  try {
    await req.userModel.remove();
    res.send(req.userModel);
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {
  register,
  update,
  remove,
};
