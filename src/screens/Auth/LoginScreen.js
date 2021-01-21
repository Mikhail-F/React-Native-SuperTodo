import React, {useState} from 'react'
import {Text, TextInput, View, TouchableOpacity, StyleSheet, Alert} from "react-native";
import {emailIsUse, isLoginUser} from "../../Redux/AuthReducer";
import {useDispatch, useSelector} from "react-redux";

const LoginScreen = ({navigation}) => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    let emailUse = useSelector(state => state.auth.emailIsUse)
    let dispatch = useDispatch()

    let loginUser = (email, password) => {
        dispatch(isLoginUser(email, password))
        navigation.navigate('AllTasks')
    }

    if (emailUse) {
        return <View>
            {Alert.alert(
                'Ошибка',
                'Вы ввели не верный email или пароль',
                [
                    {
                        title: 'Закрыть',
                        onPress: () => [dispatch(emailIsUse(false)), navigation.navigate('Login')]
                    }
                ]
            )}
        </View>
    }

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={() => navigation.navigate('Forget')} style={styles.forget}>
                <Text style={styles.text}>Забыли пароль ?</Text>
            </TouchableOpacity>
            <View style={styles.inputWrapper}>
                <TextInput onChangeText={setEmail} value={email} placeholder={'Email'}
                           style={styles.input}/>
                <TextInput onChangeText={setPassword} value={password} placeholder={'Password'} secureTextEntry={true}
                           style={styles.input}/>
            </View>
            <View style={styles.btnWrapper}>
                <TouchableOpacity onPress={() => loginUser(email, password)} style={styles.login}>
                    <Text style={styles.text}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Registration')}
                                  style={{...styles.reg, marginTop: 30}}>
                    <Text style={styles.text}>Зарегистрироваться</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

LoginScreen.navigationOptions = {
    headerTitle: 'Логин'
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
        flex: 1
    },
    forget: {
        alignItems: 'flex-end'
    },
    login: {
        alignItems: 'center'
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
    btnWrapper: {
        marginTop: 20
    },
    inputWrapper: {
        marginTop: 20
    },
    text: {
        fontSize: 17
    }
})

export default LoginScreen