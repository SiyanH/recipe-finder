const userModel = require("../models/user/user.model.server");

const createUser = (user) => {
  return userModel.create(user);
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
  console.log({ user });
  //query to find it, updated data, return the actual data
  return userModel.updateOne(
    {
      _id: userId,
    },
    { recipesFromApi: user.recipesFromApi.concat(url) },
    { new: true }
  );
};

const addCreatedRecipeToUser = async (recipe, userId) => {
  const user = await findUserById(userId);
  return userModel.update(
    {
      _id: userId,
    },
    { recipes: user.recipes.concat(recipe) }
  );
};

const updateUser = (userId, newUser) => {
  //query to find it, updated data, returns the actual updated data
  return userModel.update({ _id: userId }, newUser, { new: true });
};

const findUserByCredentials = (username, password) => {
  return userModel.findOne({
    username: username,
    password: password,
  });
};

const deleteUser = (uid) => userModel.deleteOne({ _id: uid });

const deleteUserByUserName = (userName) =>
  userModel.deleteOne({ username: userName });

//Subscribe to others
const subscribeToOthers = async (profileUrl, userId) => {
  const user = await findUserByUserName(profileUrl);

  console.log({ user });
  return userModel.updateOne(
    {
      _id: userId,
    },
    { subscribeToOthers: user.subscribeToOthers.concat(user.username) },
    { new: true }
  );
};

//Add a list of profiles the user has subscribed to
//find another user by Id
//update that user with the current users id
const addSubscriptionToOtherParty = async (otherPartyId, currentUser) => {
  const otherUser = await findUserByUserName(otherPartyId);
  console.log({ otherUser });
  console.log({ currentUser });
  return userModel.updateOne(
    {
      _id: otherUser._id,
    },
    {
      subscriptionsFromOthers: otherUser.subscriptionsFromOthers.concat(
        currentUser.username
      ),
    },
    { new: true }
  );
};

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
  subscribeToOthers,
  addSubscriptionToOtherParty,
  findUserByUserName,
  deleteUserByUserName,
};
