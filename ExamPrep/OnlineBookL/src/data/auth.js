import { clearUserData, setUserData } from "../util.js";
import {get, post} from "./api.js"

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
};

//TODO Change user object according to project requirements

export async function login(email, password){

    const result = await post(endpoints.login, {email, password});
    setUserData(result);
}

export async function register(email, password){

    const result = await post(endpoints.register, {email, password});
    setUserData(result);
}

export async function logout(){

    get(endpoints.logout);
    clearUserData();
}

// export async function login(email, password) {
//     const { _id, email: resultEmail, accessToken } = await post('/users/login', { email, password });

//     setUserData({
//         _id,
//         email: resultEmail,
//         accessToken
//     })
// }

// export async function register(email, password) {
//     const { _id, email: resultEmail, accessToken } = await post('/users/register', { email, password });

//     setUserData({
//         _id,
//         email: resultEmail,
//         accessToken
//     })
// }

// export async function logout() {
//     get('/users/logout');
//     clearUserData();
// }