import  React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Button, ActivityIndicator, Platform } from 'react-native';


import { netRequest, netService } from '../../manager/net'
import AnimeListCell from './AnimeListCell'

import { connect } from 'react-redux'
import * as AnimeActions from '../../redux/actions/animes'

import { Actions } from 'react-native-router-flux';

class AnimeList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            list: [],
            selected: null
        }
    }

    componentDidMount(){
    }

    componentWillMount(){

        this.props.fetchAnimeList()
    }

    checkMargin(){
        if (this.props.isFetching){
            return { marginVertical: 10}
        } else {
            return { marginVertical: -20}
        }
    }

    //To show a spinner at the top while loading things
    renderHeader(){
        return <ActivityIndicator animating={this.props.isFetching} size="large" color="#0000ff" style={this.checkMargin()}/>
    }

    render () {
        return (
            <View style={[styles.container]}>
                <FlatList
                    data = {this.props.list}
                    renderItem = { ({item}) => this.renderRow(item) }
                    ListHeaderComponent = {() => this.renderHeader() }
                    keyExtractor = { (item, index) => index.toString()}
                    numColumns={2}/>
            </View>
        
        )
    }

    checkIsSelected(item) {

        return this.state.selected &&
            this.state.selected.attributes.canonicalTitle
                == item.attributes.canonicalTitle
                ? { backgroundColor: 'blue'}
                : { backgroundColor: 'white'}
    }

    rowSelected(item){

        this.props.updateSelected(item)

    }

    renderRow (item) {

        const cellStyle = this.checkIsSelected(item)
        return (
            <AnimeListCell
                    item={item}
                    onSelect={() => this.rowSelected(item)
                     }>
            </AnimeListCell>

        );
    }

}

const mapStateToProps = (state) => {

    return {
        list: state.animeReducer.list,
        selected: state.animeReducer.item,
        isFetching: state.animeReducer.isFetching
    }
}

const mapDispatchToProps = (dispatch, props) => {

    return {
        fetchAnimeList: () => {
            dispatch(AnimeActions.fetchAnimeList())
        },
        updateSelected: (selected) => {
            dispatch(AnimeActions.actionAnimeSelected(selected))
            Actions.characterList({title: selected.attributes.canonicalTitle })
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(AnimeList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,

    },
});