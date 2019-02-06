import * as types from '../types/characters'
import { netRequest, netService } from '../../manager/net'

//Actions for reducer. Here we have the type and values
function actionUpdateCharacterList(value, isNewCharList = true) {

    return {
        type: types.CHARACTERS_UPDATE_LIST,
        isNewCharList,
        value
    }
}

function setCharacterFetching(value){
 
    return{
        type: types.CHARACTERS_SET_FETCHING,
        value
    }

}

export function actionCharacterSelected(value){

    return {
        type: types.CHARACTERS_SELECTED,
        value

    }
}

export function fetchCharacterList(){

    return (dispatch, getState) => {

        const animeID = getState().animeReducer.item.id;
      
        dispatch(setCharacterFetching(true))

        netRequest
            .getFrom(netService.paths.anime + '/' + animeID + netService.paths.charactersList)
            .then((response) => {
                const characterList =  response.data.data

                let isNew = true;

                characterList.forEach(element => {
                    netRequest
                    .getFrom(netService.paths.character1+element.id+netService.paths.character2)
                    .then((response) => {
                    
                        dispatch(actionUpdateCharacterList(response.data.data, isNew))
                        isNew = false;
                    }).catch(error => {
                        dispatch(setCharacterFetching(false))
                        console.log(error);
                    })
                
                });
                dispatch(setCharacterFetching(false))
                

            }).catch(error => {
                dispatch(setCharacterFetching(false))
                console.log(error);
            })
        }
}