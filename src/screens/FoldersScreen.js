import React, {useEffect, useState} from 'react'
import {Text, View, FlatList, Modal, TextInput, Button, StyleSheet, Alert, TouchableOpacity} from "react-native";
import Folder from "../components/Folder";
import {useDispatch, useSelector} from "react-redux";
import {addFolder, isRemoveFolder} from "../Redux/todoReducer";
import {AntDesign} from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const FoldersScreen = ({navigation}) => {

    const dispatch = useDispatch()

    const [visibleModal, setVisibleModal] = useState(false)
    const [folderName, setFolderName] = useState('')
    const [selectColor, setSelectColor] = useState('#C9D1D3')

    const folders = useSelector(state => state.todo.folders)
    let colors = useSelector(state => state.todo.colors)

    const onTask = (item) => {
        navigation.navigate('Task', {item})
    }

    useEffect(() => {
        navigation.setParams({setVisibleModal})
    }, [])

    const addNewFolder = () => dispatch(addFolder({color: selectColor, name: folderName}))
    const removeFolder = (id) => dispatch(isRemoveFolder(id))

    let alert = (id) => Alert.alert(
        'Удаление папки',
        `Вы уверены, что хотите удалить папку ?`,
        [
            {text: 'Нет'},
            {text: 'Да', onPress: () => removeFolder(id)}
        ]
    )

    return (
        <View>
            <Modal visible={visibleModal} animationType={'slide'}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Создание новой задачи задачи:</Text>
                    <View style={styles.addText}>
                        <TextInput onChangeText={setFolderName} value={folderName} style={styles.inp}/>
                        <View style={styles.colorsWrapper}>
                            {colors.map((el, key) => {
                                return <TouchableOpacity key={key} activeOpacity={0.7} onPress={() => setSelectColor(el.color)}>
                                    <View style={styles.color} title={''}
                                          borderColor={el.color === selectColor ? 'black' : 'transparent'}
                                          backgroundColor={el.color}/>
                                </TouchableOpacity>
                            })}
                        </View>
                        <Button title={'Создать'}
                                onPress={() => [addNewFolder(), setVisibleModal(false), setFolderName('')]}/>
                    </View>
                    <Button title={'Закрыть'} onPress={() => setVisibleModal(false)}/>
                </View>
            </Modal>
            <FlatList
                data={folders}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <Folder name={item.name} color={item.color} item={item} onTask={onTask}
                                                alert={alert}/>}
            />
        </View>
    )
}

FoldersScreen.navigationOptions = ({navigation}) => {
    const visibleModal = navigation.getParam('setVisibleModal')
    return {
        headerTitle: 'Все папки',
        headerRight: () => <TouchableOpacity activeOpacity={0.7} onPress={() => visibleModal(true)} style={{marginRight: 20}}><AntDesign name={'pluscircleo'} size={20}/></TouchableOpacity>,
        headerLeft: () =>  <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.toggleDrawer()} style={{marginLeft: 20}}><Feather name={'menu'} size={20}/></TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10
    },
    addText: {
        justifyContent: 'center'
    },
    inp: {
        borderBottomWidth: 1,
        borderBottomColor: 'blue',
        marginBottom: 10
    },
    color: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2
    },
    colorsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 50
    },
    modalText:{
        fontSize: 18,
        marginVertical: 20
    }
})

export default FoldersScreen