import React, {useState} from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {forgetPassword} from "../../Redux/AuthReducer";

const ForgetScreen = ({navigation}) =>{
    let [text, setText] = useState('')
    return (
        <View>
            <TextInput onChangeText={setText} value={text} placeholder={'Введить ваш email'} style={styles.input} onPress={() => forgetPassword(text)}/>
            <TouchableOpacity style={{...styles.reg, marginTop: 30}}>
                <Text style={styles.text}>Восстановить</Text>
            </TouchableOpacity>
        </View>
    )
}

ForgetScreen.navigationOptions = () =>{
    return {
        headerTitle: 'Восстанвление пароля'
    }
}

const styles = StyleSheet.create({
    reg: {
        alignItems: 'center'
    },
    input: {
        textAlign: 'center',
        fontSize: 17,
        marginVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'blue',
        padding: 10
    },
    text: {
        fontSize: 17
    }
})

export default ForgetScreen