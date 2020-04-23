import axios from "axios";

//register a user
export const register = (user) =>
  axios.post("/api/users", user).then((res) => console.log(res));

//open user profile
export const profile = async () => axios.get("/api/users/profile");

//implement login
export const login = (user) => axios.post("/api/login", user);

//implement login
export const logout = () => axios.post("/logout");

//update user profile
export const updateProfile = (user) => axios.put(`/api/users`, user);

//add a recipe to user from the api
export const addRecipeToUser = (recipe) =>
  axios.post("/api/users/edamamrecipes", recipe);

//subscribe to user
export const subscribe = (user) =>
  axios
    .post("/api/users/subscribe", user)
    .then(res => res.data);

//Get all users on the database
export const findAllUsers = () => axios.get("/api/users");

//Delete users on the database
export const deleteUser = (username) =>
  axios.delete(`/api/users/delete/${username}`).then((res) => console.log(res));

//implement update user
// export const updateprofile = (user) =>
//     axios.put('/api/users/profile', user).then(res =>
//                                                    console.log(res))

export default {
    subscribe,
    deleteUser,
    findAllUsers
}
