import axios from "axios";

//register a user
export const register = (user) =>
    axios
        .post("/api/users", user)
        .catch((err) => {
            console.log("services:error");
        });


//open user profile
export const profile = () => axios.get("/api/users/profile");

//implement login
export const login = (user) => axios.post("/api/login", user);

//implement logout
export const logout = () => axios.post("/logout");

//update user profile
export const updateProfile = (user) => axios.put(`/api/users`, user);

//add a recipe to user from the api
export const addRecipeToUser = (recipe) =>
    axios.post("/api/users/edamamrecipes", recipe);

//subscribe to user
export const subscribe = (user) =>
    axios.post("/api/users/subscribe", user).then((res) => res.data);

//Delete users on the database
export const deleteUser = (username) =>
    axios.delete(`/api/users/delete/${username}`).then((res) => res.ok);

//add usercreated recipe
export const createRecipe = (recipe) =>
    axios.post("/api/recipes", recipe).then(res => res.config.data);

//Get all users on the database
export const findAllUsers = () => axios.get("/api/users");

export const findUserByUsername = (username) =>
    axios.get(`/api/users/username/${username}`).then(res => res.data);

export const findFollowers = (userId) =>
    axios.get(`/api/users/${userId}/followers`).then(res => res.data);

//implement update user
// export const updateprofile = (user) =>
//     axios.put('/api/users/profile', user).then(res =>
//                                                    console.log(res))

export default {
    subscribe,
    deleteUser,
    findAllUsers,
};