import axios from 'axios';
import qs from 'qs';

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

//implement update user
export const updateprofile = (user) =>
    axios.put('/api/users/profile', user).then(res =>
                                                   console.log(res))