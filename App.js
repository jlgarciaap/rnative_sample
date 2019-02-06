/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';

import { Actions, Scene, Router } from 'react-native-router-flux';

import AnimeList from './src/sections/animes/AnimeList';
import CharacterList from './src/sections/characters/CharactersList';

import { netService }  from './src/manager/net'

/*********** REDUUXXXXXX *********** */
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from './src/redux/reducers' 
import animeReducer from './src/redux/reducers/animes'
import characterReducer from './src/redux/reducers/characters'
const reducer = combineReducers({animeReducer, characterReducer }) 

//We create the redux store
const store = createStore(
  reducer,
  applyMiddleware(thunk)
)
/*********** REDUUXXXXXX *********** */

export default class App extends Component {

  componentWillMount(){

    netService.configure()
    StatusBar.setBarStyle('light-content')

  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">

            <Scene
               key="animeList"
               component={ AnimeList }
               title="Anime List"
               hideNavBar
               />
               
            <Scene
                key="characterList"
                component={ CharacterList }
                title="Character List"
                navigationBarStyle={styles.navbar}
                navBarButtonColor={'white'}
            />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
    navbar:{
      backgroundColor: 'rgb(36, 36, 36)'
    }
});