const userModel = require("../models/users.model.server");

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

//Add subscribers to our user
const addSubscriberToUser = async (profileUrl, userId) => {
  const user = await findUserById(userId);
  console.log({ user });
  return userModel.updateOne(
    {
      _id: userId,
    },
    { subscribers: user.subscribers.concat(profileUrl) },
    { new: true }
  );
};

//Add a list of profiles the user has subscribed to
const addSubscription = async (profileUrl, userId) => {
  const user = await findUserById(userId);
  console.log({ user });
  return userModel.update(
    {
      id: userId,
    },
    { subscribed: user.subscribed.concat(profileUrl) }
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
  addSubscriberToUser,
};
