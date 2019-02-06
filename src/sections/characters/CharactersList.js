import  React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Button, ActivityIndicator, Image, Dimensions } from 'react-native';


import { netRequest, netService } from '../../manager/net'

import { connect } from 'react-redux'
import * as CharactersAction from '../../redux/actions/characters'

class CharactersList extends Component {

    componentWillMount(){
        this.props.fetchCharactersList()
    }

    render(){

        return(
            <View style={{backgroundColor: 'black'}}>
            <FlatList
                data = {this.props.list}
                renderItem = { ({item}) => this.renderRow(item) }
                //ListHeaderComponent = {() => this.renderHeader() }
                keyExtractor = { (item, index) => index.toString()}
                extraData = { this.state }
               />
        </View>
        )
    }


    checkImage(item){
        if (item.attributes.image && item.attributes.image.original){
            return {uri: item.attributes.image.original}
        } else {
            return require('../commons/600x600.png')
        }
    }

    renderRow(item){
        return(
        <View style={styles.cellRow}>
                <Image
                    source={this.checkImage(item)}
                    style={styles.cellImage}
                    resizeMode='cover'
                ></Image>
                 <Text style={styles.cellText}>{item.attributes.canonicalName}</Text>
            </View>
            )
    }

}

const mapStateToProps = (state) =>  {

    return {
        anime: state.animeReducer.item,
        list: state.characterReducer.list,
        isFetching: state.characterReducer.isFetching
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchCharactersList: () => {
            dispatch(CharactersAction.fetchCharacterList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)

const styles = StyleSheet.create({
    cellRow:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 3 - 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    cellText:{
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'

    },
    cellImage:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.60


    }
})