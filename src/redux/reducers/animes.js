import * as types from '../types/animes'

//We use isFetching to show a spinner while loading
const initialState = {
    isFetching: false,
    list: [],
    item: null
}

export default function reducer(state = initialState, action = {}){

    switch (action.type) {
        case types.ANIME_UPDATE_LIST:
            return{
                ...state,
                list: action.value
            };
        case types.ANIME_SELECTED:
            return{
                ...state,
                item: action.value
            };
        case types.ANIME_SET_FETCHING:
            return{
                ...state,
                isFetching: action.value
            };
        default:
            return state
    }

}