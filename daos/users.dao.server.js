const userModel = require('../models/users.model.server')

const createUser = (user) => {
    return userModel.create(user)
}
const findAllUsers = () => {
    return userModel.find()
}
const findUserById = (userId) => {
    return userModel.findOne(
        {
            _id: userId
        }
    )
}

const updateUser = (userId, newUser) => {
    return userModel.update({_id: userId}, newUser)
}

const findUserByCredentials =
    (username, password) => {
        return userModel.findOne(
            {
                username: username,
                password :password
            })
    }

const deleteUser = (uid) =>
    userModel.deleteOne({_id: uid})

module.exports = {
    createUser,
    findAllUsers,
    findUserById,
    findUserByCredentials,
    deleteUser,
    updateUser
}