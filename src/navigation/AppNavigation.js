import React from 'react'
import {createStackNavigator} from "react-navigation-stack";
import AllScreen from "../screens/AllScreen";
import FoldersScreen from "../screens/FoldersScreen";
import TasksScreen from "../screens/TasksScreen";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createAppContainer} from "react-navigation";
import {AntDesign, Ionicons} from '@expo/vector-icons'
import {createDrawerNavigator} from "react-navigation-drawer";
import SideBar from "../components/SideBar";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegistrationScreen from "../screens/Auth/RegistrationScreen";
import ForgetScreen from "../screens/Auth/ForgetPassword";

const Auth = createStackNavigator({
    Login: LoginScreen,
    Registration: RegistrationScreen,
    Forget: ForgetScreen
})


const AllTasks = createStackNavigator({
        AllTasks: AllScreen
    },
    {
        defaultNavigationOptions: {
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerTitle: 'Все задачи'
        }
    }
)

const AllFolders = createStackNavigator({
        AllFolders: FoldersScreen,
        Task: TasksScreen
    },
    {
        defaultNavigationOptions: {
            headerTintColor: 'black',
            headerTitleAlign: 'center'
        }
    }
)

const BottomNavigator = createBottomTabNavigator({
        AllTasks: {
            screen: AllTasks,
            navigationOptions: {
                tabBarIcon: info => (
                    <Ionicons name={'albums-outline'} size={25} color={info.tintColor}/>
                ),
                tabBarLabel: 'Все папки и задачи',
                unmountOnBlur: true
            }
        },
        AllFolders: {
            screen: AllFolders,
            navigationOptions: {
                tabBarIcon: info => (
                    <AntDesign name={'folderopen'} size={25} color={info.tintColor}/>
                ),
                tabBarLabel: 'Папки',
                unmountOnBlur: true
            }
        },
    },
    {
        initialRouteName: 'AllTasks'
    })

// const DrawerNavigator = createDrawerNavigator({
//     Program: {
//         screen: BottomNavigator,
//         navigationOptions: {
//             drawerLabel: 'О программе'
//         }
//     }
// },
//     {
//         contentComponent: props => <SideBar {...props}/>,
//         contentOptions:{
//             activeTintColor: 'blue'
//         }
//     }
//     )

const All = createStackNavigator({
        DrawerNavigator: createDrawerNavigator({
                AllFoldersAndTasks: {
                    screen: BottomNavigator,
                    navigationOptions: {
                        drawerLabel: 'Все папки и задачи'
                    }
                }
            },
            {
                contentComponent: props => <SideBar {...props}/>,
                contentOptions: {
                    activeTintColor: 'blue'
                }
            }
        ),
        Auth: createStackNavigator({
                Login: LoginScreen,
                Registration: RegistrationScreen,
                Forget: ForgetScreen
            },
            {
                headerMode: "float"
            }),

    },
    {
        initialRouteName: 'DrawerNavigator',
        headerMode: 'none'
    })

export const AppNavigation = createAppContainer(All)