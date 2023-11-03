const User = require('../models/user');

const registerUser = (req, res) => {
  
};

const loginUser = (req, res) => {
  
};

const getUser = async (req, res) => {

  const {_id, email, username} = req.body;

  try {
    const user = await User.findOne({
      $or: [{ _id }, { email }, { username }]
    });

    if (user === null) {
      return res.status(404).send('No user with that email exists.');
    }
    return res.status(200).json({id: user._id, email: user.email, username: user.username});
  } catch (err) {
    console.log(err)
    return res.status(500).send('Server error.');
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
