import { get, post, put, del } from "./api.js";

const endpoints = {
    catalog: '/data/fruits?sortBy=_createdOn%20desc',
    byId: '/data/fruits/',
    create: '/data/fruits'       
}

export async function getAllFruits(){
    return get(endpoints.catalog);
}

export async function getById(id){
    return get(endpoints.byId + id);
}

export async function createFruit(data){
    return post(endpoints.create, data);
}

export async function editFruit(id, data){
    return put(endpoints.byId + id, data);
}

export async function deleteFruit(id){
    return del(endpoints.byId + id);
}

export async function getSearchedFruit(query){
    return get(`/data/fruits?where=name%20LIKE%20%22${query}%22`);
}