import axios from 'axios';
import qs from 'qs';
export const register = (user) =>
    axios.post( '/api/users',user).then(res =>
    console.log(res))