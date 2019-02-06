import  axios  from 'axios';

export function configure(){

    //Axios default params
    axios.defaults.baseURL = paths.baseURL
    axios.defaults.headers.post['Content-Type'] = 'application/json'

}

export const paths = {
    baseURL: 'https://kitsu.io/api/edge',
    anime: '/anime',
    manga: '/manga',
    charactersList: '/relationships/anime-characters',
    character1: '/anime-characters/',
    character2: '/character'

}