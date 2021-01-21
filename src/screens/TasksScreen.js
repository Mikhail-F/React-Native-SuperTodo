import React, {useEffect, useState} from 'react'
import {View, FlatList, Modal, TextInput, Button, Text, StyleSheet, TouchableOpacity} from "react-native";
import Task from "../components/Task";
import {useDispatch, useSelector} from "react-redux";
import {isAddTask, isChangeFolder, isChangeTask, isCheckedTask, isRemoveTask} from "../Redux/todoReducer";
import {AntDesign, Feather} from '@expo/vector-icons';

const TasksScreen = ({navigation}) => {
    const dispatch = useDispatch()

    let folder = navigation.getParam('item')

    {/*Создание новой задачи*/}
    const [modalAddNewTaskView, setAddNewTaskView] = useState(false)
    const [modalChangeTaskText, setChangeTaskText] = useState('')
    {/*Изменение названия папки*/}
    const [modalChangeFolerView, setChangeFolerView] = useState(false)
    const [modalChangeFolderText, setChangeFolderText] = useState('')

    const tasks = useSelector(state => state.todo.tasks)
    const folderTasks = tasks.filter(el => +el.folderId === folder.id)

    let onToggleChecked = (id) => dispatch(isCheckedTask(id))
    let onRemoveTask = (id) => dispatch(isRemoveTask(id))
    let onChangeTask = (id, text) => dispatch(isChangeTask(id, text))
    let onAddTask = (task, folderId) => {
        setAddNewTaskView(false)
        setChangeTaskText('')
        dispatch(isAddTask(task, folderId))
    }
    let changeFolder = (id, name) => {
        setChangeFolerView(false)
        navigation.navigate('AllFolders')
        dispatch(isChangeFolder(id, name))
    }

    useEffect(() => {
        navigation.setParams({setAddNewTaskView, setChangeFolerView})
    }, [])

    return (
        <View>
            {/*Создание новой задачи*/}
            <Modal animationType={'slide'} visible={modalAddNewTaskView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Создание новой задачи задачи:</Text>
                    <View style={styles.addText}>
                        <TextInput onChangeText={setChangeTaskText} value={modalChangeTaskText} style={styles.inp}/>
                        <Button title={'Сохранить'}
                                onPress={() => onAddTask(modalChangeTaskText, folder.id)}/>
                    </View>
                    <Button title={'Закрыть окно'} onPress={() => [setAddNewTaskView(false), setChangeTaskText('')]}/>
                </View>
            </Modal>
            {/*Изменение названия папки*/}
            <Modal animationType={'slide'} visible={modalChangeFolerView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Изменение названия папки:</Text>
                    <View style={styles.addText}>
                        <TextInput onChangeText={setChangeFolderText} value={modalChangeFolderText} style={styles.inp}/>
                        <Button title={'Сохранить'} onPress={() => changeFolder(folder.id, modalChangeFolderText)}/>
                    </View>
                    <Button title={'Закрыть окно'} onPress={() => setChangeFolerView(false)}/>
                </View>
            </Modal>
            <FlatList
                data={folderTasks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <Task folder={folder} item={item} onToggleChecked={onToggleChecked}
                                              onRemoveTask={onRemoveTask} onChangeTask={onChangeTask}/>}
            />
        </View>
    )
}

TasksScreen.navigationOptions = ({navigation}) => {
    const folder = navigation.getParam('item')
    const setAddNewTaskView = navigation.getParam('setAddNewTaskView')
    const setChangeFolerView = navigation.getParam('setChangeFolerView')

    return {
        headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 18, marginRight: 10, marginLeft: 30}}>{folder.name}</Text>
                <TouchableOpacity activeOpacity={0.7} style={{marginLeft: 20}} onPress={() => setChangeFolerView(true)}>
                    <AntDesign name={'edit'} size={15}/>
                </TouchableOpacity>
            </View>
        ),
        headerStyle: {
            backgroundColor: folder.color
        },
        headerRight: () => <TouchableOpacity activeOpacity={0.7} style={{marginRight: 20}} onPress={() => setAddNewTaskView(true)}>
            <AntDesign name={'pluscircleo'} size={20}/>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        padding: 10
    },
    addText: {
        justifyContent: 'center',
        flex: 1
    },
    inp: {
        borderBottomWidth: 1,
        borderBottomColor: 'blue',
        marginBottom: 10
    },
    modalText:{
        fontSize: 18,
        marginVertical: 20
    }
})

export default TasksScreen