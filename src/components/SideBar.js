import React from 'react'
import {ScrollView, Text, View, TouchableOpacity, Image, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {DrawerNavigatorItems} from "react-navigation-drawer";
import {logOut} from "../Redux/AuthReducer";

const SideBar = (props) => {
    let name = useSelector(state => state.todo.name)
    let dispatch = useDispatch()

    return (
        <ScrollView style={styles.wrapper}>
            {name === null ?
                <View style={styles.user}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                        <Image source={require("../../assets/user/unloginUser.png")} style={styles.userImg}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                        <Text style={{...styles.userText, color: 'blue'}}>Логин</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.user}>
                    <TouchableOpacity onPress={() => dispatch(logOut())}>
                        <Image source={require("../../assets/user/loginUser.png")} style={styles.userImg} />
                    </TouchableOpacity>
                    <Text style={styles.userText}>{name}</Text>
                </View>}
            <View>
                <DrawerNavigatorItems {...props}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper:{

    },
    user:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        paddingTop: 30,
        paddingBottom: 20,
        paddingHorizontal: 10
    },
    userImg:{
        width: 80,
        height: 80,
        marginRight: 15,
        borderRadius: 50
    },
    userText:{
        fontSize: 15
    }
})

export default SideBar