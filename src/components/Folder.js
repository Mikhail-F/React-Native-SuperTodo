import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

const Folder = ({item, name, onTask, color = 'grey', alert}) =>{
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => onTask(item)} onLongPress={() => alert(item.id)}>
            <View style={styles.container}>
                <View style={styles.circleWrap}>
                    <View style={styles.circle} backgroundColor={color}/>
                </View>
                <View style={styles.folderName}>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        backgroundColor: "white",
        marginTop: 15,
        position: 'relative'
    },
    circleWrap:{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: '10%',
        top: 15
    },
    circle: {
        borderRadius: 50,
        width: 20,
        height: 20
    },
    folderName:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    text:{
        fontSize: 14
    }
});

export default Folder