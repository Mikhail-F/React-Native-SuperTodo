import React, {useEffect} from 'react'
import {View, FlatList, ActivityIndicator, TouchableOpacity} from "react-native";
import AllTaskBlock from "../components/AllTaskBlock";
import {useDispatch, useSelector} from "react-redux";
import {loadData} from "../Redux/todoReducer";
import {Feather} from "@expo/vector-icons";
import {authUser} from "../Redux/AuthReducer";

const AllScreen = () =>{

    const folders = useSelector(state => state.todo.folders)
    const loading = useSelector(state => state.todo.loading)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(authUser())
    }, [dispatch])

    if(loading){
        return (
            <View>
                <ActivityIndicator color={'blue'} style={{justifyContent: 'center', alignItems: 'center'}}/>
            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={folders}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <AllTaskBlock folder={item}/>}
            />
        </View>
    )
}

AllScreen.navigationOptions = ({navigation}) =>{
    return {
        headerLeft: () => <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.toggleDrawer()} style={{marginLeft: 20}}><Feather name={'menu'} size={20}/></TouchableOpacity>
    }
}

export default AllScreen