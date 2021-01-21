import {loginUser, setData} from "./todoReducer";
import {DB} from "../database";
import firebase from 'firebase';
import {authUserApi, userDataApi} from "../api/api";

let LOG_OUT = 'LOG_OUT'
let EMAIL_IS_USE = 'EMAIL_IS_USE'

let initialState = {
    logOut: false,
    emailIsUse: false
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_OUT: {
            return {
                ...state,
                logOut: true
            }
        }
        case EMAIL_IS_USE: {
            return {
                ...state,
                emailIsUse: action.bool
            }
        }
        default:
            return state
    }
}

export const updateData = (id, type, obj) => {
    userDataApi.updateUserData(id, type, obj)
}

const isLogOut = () => {
    return ({type: LOG_OUT})
}

export const emailIsUse = (bool) => {
    return ({type: EMAIL_IS_USE, bool})
}

export const authUser = () => {
    return async (dispatch, getState) => {
        await firebase.auth().onAuthStateChanged(async function (user) {
            if (user) {
                let uid = user.uid
                let name = user.displayName
                authUserApi.findUser(uid)
                    .then(async result => {
                        let data = result.val()
                        let folders = []
                        let tasks = []
                        await DB.deleteAllFolders()
                        await DB.deleteAllTasks()
                        if (data) {
                            if (data.folders) {
                                folders = data.folders
                                folders.map(async el => {
                                    await DB.createFolder(el)
                                })
                            }
                            if (data.tasks) {
                                tasks = data.tasks
                                tasks.map(async el => {
                                    await DB.createTask(el)
                                })
                            }
                        }
                        dispatch(setData(folders, tasks, uid))
                        dispatch(loginUser(uid, name))
                    })
        }})
        if (!getState().auth.logOut) {
            const folders = await DB.getFolders()
            const tasks = await DB.getTasks()
            dispatch(setData(folders, tasks))
        }
    }
}

export const isLoginUser = (email, password) => {
    return (dispatch, getState) => {
        authUserApi.login(email, password)
            .then(response => {
                dispatch(loginUser(response.user.uid))
            })
            .catch(err => {
                if(getState().todo.uid === null){
                    dispatch(emailIsUse(true))
                }
            })
    }
}

export const isRegistration = (email, password, name) => {
    return dispatch => {
        authUserApi.registration(email, password, name)
            .then(() => {
                firebase.auth().currentUser.updateProfile({displayName: name})
                    .then(() => {
                        dispatch(authUser())
                    })
            })
            .catch(err => {
                dispatch(emailIsUse(true))
            })
    }
}

export const forgetPassword = (email) => {
    authUserApi.forgetPassword(email)
}

export const logOut = () => {
    return dispatch => {
        authUserApi.out()
            .then(() => {
                dispatch(loginUser(null, null))
                dispatch(isLogOut(true))
            })
    }
}


export default AuthReducer