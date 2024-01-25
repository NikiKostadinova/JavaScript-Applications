import { get, post } from "./api.js";

const endpoints = {
    likes: '/data/likes',
    totalLikes: albumId => `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    likesForUser: (albumId, userId) => `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function likeAlbum(albumId){
    return post(endpoints.likes, {albumId});
}
export async function getAllLikes(albumId){
    return get(endpoints.totalLikes(albumId));
}
export async function getUserLikes(albumId, userId){
    return get(endpoints.likesForUser(albumId, userId));
}