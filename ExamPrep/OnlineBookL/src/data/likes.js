import { get, post } from "./api.js";

const endpoints = {
    likes: '/data/likes',
    totalLikes: bookId => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    likesForSpecUser: (bookId, userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function likeBook(bookId){
    return post(endpoints.likes, {bookId});
}
export async function getAllLikes(bookId){
    return get(endpoints.totalLikes(bookId));
}
export async function getUserLikes(bookId, userId){
    return get(endpoints.likesForSpecUser(bookId, userId));
}