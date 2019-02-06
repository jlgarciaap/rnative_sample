import React, { Component } from 'react'
import { Platform, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'

export default class AnimeListCell extends Component {

    static defaultProps = {
        onSelect    : () => {},
        item        : {},
    }

    render (){

        const { item, onSelect } = this.props

        const image = item.attributes.posterImage.medium
                        ? {uri: item.attributes.posterImage.medium}
                        : null

        return(
            <TouchableOpacity
                style={styles.container}
                onPress={()=> onSelect(item)}>
                <Image
                    source={image}
                    style={styles.image}
                    resizeMode='cover'></Image>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        width: Dimensions.get('window').width / 2 - 10,
        height: Dimensions.get('window').height / 3 - 10,
        margin: 5,
        backgroundColor: 'black',
        ...Platform.select({
            ios:{
                shadowColor: 'rgba(255,255,255,0.3)',
                shadowOpacity: 1,
                shadowOffset: { height: 2, width: 2},
                shadowRadius: 2
            },
            android: {
                elevation: 2
            }

        })
    },
   
    image: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }


});