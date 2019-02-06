import * as types from '../types/characters'

const initialState = {
    isFetching: false,
    list: [],
    item: null
}

var listLocal = []


export default function reducer ( state = initialState, action = {}) {


    switch (action.type) {
        case types.CHARACTERS_UPDATE_LIST:
            if (action.isNewCharList){
                listLocal = [action.value]
            } else {
                listLocal.push(action.value)
            }

            return {
                ...state,
                list: listLocal
            };

        default:
            return state;
    }

}