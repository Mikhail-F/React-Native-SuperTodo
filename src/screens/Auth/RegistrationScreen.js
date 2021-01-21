import React, {useState} from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Alert} from "react-native";
import {emailIsUse, isRegistration} from "../../Redux/AuthReducer";
import {useDispatch, useSelector} from "react-redux";

const RegistrationScreen = ({navigation}) => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [name, setName] = useState('')


    let emailUse = useSelector(state => state.auth.emailIsUse)
    let dispatch = useDispatch()

    let registration = (email, password, name) => {
        dispatch(isRegistration(email, password, name))
        navigation.navigate('AllTasks')
    }

    if (emailUse) {
        return <View>
            {Alert.alert(
                'Ошибка',
                'Такой email уже используется',
                [
                    {
                        title: 'Закрыть',
                        onPress: () => [dispatch(emailIsUse(false)), navigation.navigate('Registration')]
                    }
                ]
            )}
        </View>
    }


    return (
        <View>
            <View style={styles.inputWrapper}>
                <TextInput onChangeText={setEmail} value={email} placeholder={'Email'} style={styles.input}/>
                <TextInput onChangeText={setPassword} value={password} placeholder={'Пароль'} style={styles.input}
                           secureTextEntry={true}/>
                <TextInput onChangeText={setName} value={name} placeholder={'Имя'} style={styles.input}/>
            </View>
            <TouchableOpacity onPress={() => registration(email, password, name)}
                              style={{...styles.reg, marginTop: 30}}>
                <Text style={styles.text}>Зарегистрироваться</Text>
            </TouchableOpacity>
        </View>
    )
}

RegistrationScreen.navigationOptions = ({navigation}) => {
    return {
        headerTitle: 'Регистрация'
    }
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
        flex: 1
    },
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
    inputWrapper: {
        marginTop: 20
    },
    text: {
        fontSize: 17
    }
})

export default RegistrationScreen