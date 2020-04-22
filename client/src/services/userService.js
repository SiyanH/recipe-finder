import axios from 'axios';

//register a user
export const register = (user) =>
    axios.post( '/api/users',user).then(res =>
    console.log(res))

//open user profile
export const profile = async () =>
    axios.get('/api/users/profile')

//implement login
export const login = (user) =>
    axios.post('/api/login', user)

//implement login
export const logout = () =>
    axios.post('/logout')

export const updateprofile = (user) =>
    axios.put(`/api/users/${user.username}`, {
        _id: user._id
    }).then(res => console.log(res))

//implement update user
// export const updateprofile = (user) =>
//     axios.put('/api/users/profile', user).then(res =>
//                                                    console.log(res))