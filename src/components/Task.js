import React, {useState} from 'react'
import {View, Text, StyleSheet, Button, Modal, TextInput, Alert, TouchableOpacity} from "react-native";
import {AntDesign} from '@expo/vector-icons';

const Task = ({item, onToggleChecked, onRemoveTask, onChangeTask}) => {

    const [modalView, setModalView] = useState(false)
    const [modalText, setModalText] = useState(item.text)

    let alert = () => Alert.alert(
        'Измение задачи',
        'Вы действительно хотите изменить задачу ?',
        [
            {text: 'Отмена'},
            {text: 'Да', onPress: () => [setModalView(false), onChangeTask(item.id, modalText)]}
        ]
    )

    let alertRemove = () => Alert.alert(
        'Удаление задачи',
        'Вы действительно хотите удалить задачу ?',
        [
            {text: 'Отмена'},
            {text: 'Да', onPress: () => onRemoveTask(item.id)}
        ]
    )

    return (
        <View style={styles.container}>

            <Modal animationType={'slide'} visible={modalView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Редактирование задачи:</Text>
                    <View style={styles.addText}>
                        <TextInput onChangeText={setModalText} value={modalText} style={styles.inp}/>
                        <Button title={'Изменить'} onPress={alert}/>
                    </View>
                    <Button title={'Закрыть окно'} onPress={() => setModalView(false)}/>
                </View>
            </Modal>

            <View style={styles.circleWrap}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => onToggleChecked(item.id)}><AntDesign
                    name="checkcircleo" size={24} color={item.checked === 1 ? 'green' : 'black'}/></TouchableOpacity>
            </View>
            <View style={styles.folderName}>
                <Text style={styles.text}>{item.text}</Text>
            </View>
            <View style={styles.btns}>
                <TouchableOpacity activeOpacity={0.7}
                                  onPress={() => [setModalView(true), setModalText(item.text)]}><AntDesign name={'edit'}
                                                                                                           size={19}/></TouchableOpacity>
                {item.checked === 1 && <TouchableOpacity activeOpacity={0.7} onPress={alertRemove}><AntDesign size={19}
                                                                                                              name={'delete'}/></TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        backgroundColor: "white",
        marginTop: 15,
        justifyContent: 'space-between'
    },
    circleWrap: {
        flexBasis: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 20,
        height: 20,
    },
    folderName: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 20,
        flexBasis: '70%'
    },
    btns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 60
    },
    text: {
        fontSize: 14
    },
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
});

export default Task