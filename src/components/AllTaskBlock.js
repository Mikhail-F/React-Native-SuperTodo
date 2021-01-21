import React from 'react'
import {Text, View, FlatList, StyleSheet} from "react-native";
import {useSelector} from "react-redux";

const AllTaskBlock = ({folder}) =>{

    let tasks = useSelector(state => state.todo.tasks.filter(el => +el.folderId === folder.id))

    return (
        <View style={styles.container}>
            <View style={styles.header} backgroundColor={folder.color}>
                <Text style={styles.textFolder}>{folder.name}</Text>
            </View>
            <FlatList
                data={tasks}
                keyExtractor={el => el.id}
                renderItem={({item}) => {
                    return (
                        <View style={styles.taskWrap}>
                            <View style={styles.circleWrap}>
                                <View style={styles.circle} backgroundColor={item.checked === 1 ? 'green' : 'white'}></View>
                            </View>
                            <View style={styles.folderName}>
                                <Text style={styles.textTask}>{item.text}</Text>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "white",
    },
    header:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    textFolder:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17
    },
    circleWrap:{
        flexBasis: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    circle: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black',
        width: 20,
        height: 20,
    },
    taskWrap:{
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        marginTop: 8,
        marginBottom: 8
    },
    textTask: {
        paddingRight: 40,
        fontSize: 14
    }
})

export default AllTaskBlock