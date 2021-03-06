const userModel = require("../models/user/user.model.server");

const createUser = async (user) => {
  const existingUser = await findUserByUserName(user.username);
  try {
    if (existingUser) {
      return null;
    } else {
      return userModel.create(user);
    }
  } catch (err) {
    console.log("dao: error from here");
  }
};
const findAllUsers = () => {
  return userModel.find();
};
const findUserById = (userId) => {
  return userModel.findOne({
    _id: userId,
  });
};
const findUserByUserName = (userName) => {
  return userModel.findOne({
    username: userName,
  });
};

const addEdamamRecipeToUser = async (url, userId) => {
  const user = await findUserById(userId);
  //query to find it, updated data, return the actual data
  return userModel.findOneAndUpdate(
    {
      _id: userId,
    },
    { recipesFromApi: user.recipesFromApi.concat(url) },
    { new: true }
  );
};

//add user created recipe to the user
const addCreatedRecipeToUser = async (recipe, userId) => {
  return userModel.update(
    {
      _id: userId,
    },
    { $push: { recipes: recipe } }
  );
};

const updateUser = (userId, newUser) => {
  //query to find it, updated data, returns the actual updated data
  return userModel.findOneAndUpdate({ _id: userId }, newUser, { new: true })
      .populate("subscribedUsers", "username")
      .populate("followers", "username")
};

const findUserByCredentials = (username, password) => {
  return userModel.findOne({
    username: username,
    password: password,
  }).populate("subscribedUsers", "username");
};

const deleteUser = (uid) => userModel.deleteOne({ _id: uid });

const deleteUserByUserName = (userName) =>
  userModel.deleteOne({ username: userName });

//Subscribe to other user
const subscribe = async (otherUser, userId) => {
  // Update the user subscribed to
  await userModel.updateOne(
    {
      _id: otherUser._id,
    },
    { $push: { followers: userId } },
    { new: true }
  );

  // Update current user with userId
  return userModel.findOneAndUpdate(
    {
      _id: userId,
    },
    { $push: { subscribedUsers: otherUser._id } },
    { new: true }
  ).populate("subscribedUsers", "username");
};

// find followers
const findFollowers = (userId) =>
    userModel.findOne({_id: userId})
        .populate("followers", "username")
        .then(user => user.followers);

// TODO: Find all recipes for user

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  findUserByCredentials,
  addEdamamRecipeToUser,
  deleteUser,
  updateUser,
  addCreatedRecipeToUser,
  subscribe,
  findUserByUserName,
  deleteUserByUserName,
  findFollowers
};
