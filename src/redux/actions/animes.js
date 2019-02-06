import * as types from '../types/animes'
import { netRequest, netService } from '../../manager/net'

function actionUpdateAnimeList(value) {
    return {
        type: types.ANIME_UPDATE_LIST,
        value
    }
}

function setAnimeFetching(value){
    return{
        type: types.ANIME_SET_FETCHING,
        value
    }

}

export function actionAnimeSelected(value){
    return {
        type: types.ANIME_SELECTED,
        value

    }
}


export function fetchAnimeList(){

    return (dispatch, getState) => {

        dispatch(setAnimeFetching(true))

        /**
         * In this initial example we set a limit to the animelist, in the future
         * we can config pagination or dynamic limits
         */
        netRequest
            .getFrom(netService.paths.anime + '?page[limit]=20&page[offset]=0')
            .then((response) => {
                dispatch(setAnimeFetching(false))
                const list = response.data.data
                dispatch(actionUpdateAnimeList(list))

            }).catch(error => {
                dispatch(setAnimeFetching(false))
                console.log(error);
            })
        }
}