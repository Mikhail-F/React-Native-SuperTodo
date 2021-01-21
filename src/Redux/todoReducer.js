import {DB} from "../database";
import {updateData} from "./AuthReducer";

const CHECKED_TASK = 'CHECKED_TASK'
const REMOVE_TASK = 'REMOVE_TASK'
const CHANGE_TASK = 'CHANGE_TASK'
const ADD_TASK = 'ADD_TASK'

const ADD_FOLDER = 'ADD_FOLDER'
const CHANGE_FOLDER = 'CHANGE_FOLDER'
const REMOVE_FOLDER = 'REMOVE_FOLDER'

const LOGIN_USER = 'LOGIN_USER'
const LOAD_DATA = 'LOAD_DATA'

let initialState = {
    userId: null,
    name: null,

    folders: [],
    removeFolderId: [],

    tasks: [],
    removeTaskId: [],

    colors: [
        {id: '1', color: '#C9D1D3'},
        {id: '2', color: '#42B883'},
        {id: '3', color: '#64C4ED'},
        {id: '4', color: '#FFBBCC'},
        {id: '5', color: '#B6E6BD'},
        {id: '6', color: '#C355F5'},
        {id: '7', color: '#09011A'},
        {id: '8', color: '#FF6464'},
    ],

    loading: true
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        // Загрузка данных
        case LOAD_DATA: {
            return {
                ...state,
                folders: action.folders,
                tasks: action.tasks,
                loading: false
            }
        }

        // Задачи
        case ADD_TASK: {
            return {
                ...state,
                tasks: [...state.tasks, action.newTask],
                removeTaskId: action.rtID
            }
        }
        case CHECKED_TASK: {
            return {
                ...state,
                tasks: action.newTasks
            }
        }
        case REMOVE_TASK: {
            return {
                ...state,
                tasks: action.newTasks,
                removeTaskId: action.rtID
            }
        }
        case CHANGE_TASK: {
            return {
                ...state,
                tasks: action.newTasks
            }
        }

        //Folders
        case ADD_FOLDER: {
            return {
                ...state,
                folders: [...state.folders, action.newFolder],
                removeFolderId: action.rfID
            }
        }
        case CHANGE_FOLDER: {
            return {
                ...state,
                folders: action.newFolders
            }
        }
        case REMOVE_FOLDER: {
            return {
                ...state,
                folders: action.newFolders,
                tasks: action.newTasks,
                removeFolderId: action.rfID,
                removeTaskId: action.rtID
            }
        }

        case LOGIN_USER:{
            return {
                ...state,
                userId: action.uid,
                name: action.name
            }
        }
        default:
            return state
    }
}

export const setData = (folders, tasks) =>{
    return ({type: LOAD_DATA, folders, tasks})
}

export const loginUser = (uid, name) =>{
    return ({type: LOGIN_USER, uid, name})
}

export const isAddTask = (text, folderId) => {
    return async (dispatch, getState) => {
        let newTask = {
            folderId: folderId.toString(),
            checked: 0,
            text: text
        }
        await DB.createTask(newTask)

        let rtid = getState().todo.removeTaskId
        let tasks = getState().todo.tasks

        newTask.id = rtid.length === 0 ? tasks.length + 1 : rtid[0]
        let rtID = rtid.length !== 0 ? rtid.filter(el => el !== newTask.id) : []

        updateData(getState().todo.userId, 'tasks', [...getState().todo.tasks, newTask])
        updateData(getState().todo.userId, 'removeTaskId', rtID)
        dispatch(({type: ADD_TASK, newTask, rtID}))
    }
}

export const isCheckedTask = (id) => {
    return async (dispatch, getState) => {
        let task = getState().todo.tasks.find(el => el.id === id)
        await DB.checkedTask(task)
        let newTasks = getState().todo.tasks.map(el => {
            if (el.id === id) {
                return {...el, checked: el.checked === 0 ? 1 : 0}
            }
            return el
        })
        updateData(getState().todo.userId, 'tasks', newTasks)
        dispatch(({type: CHECKED_TASK, newTasks}))
    }
}

export const isRemoveTask = (id) => {
    return async (dispatch, getState) => {
        await DB.removeTask(id)
        let newTasks = getState().todo.tasks.filter(el => el.id !== id)
        updateData(getState().todo.userId, 'tasks', newTasks)
        let rtID = [...getState().todo.removeTaskId, id]
        updateData(getState().todo.userId, 'removeTaskId', rtID)
        dispatch(({type: REMOVE_TASK, newTasks, rtID}))
    }
}

export const isChangeTask = (id, text) => {
    return async (dispatch, getState) => {
        let task = getState().todo.tasks.find(el => el.id === id)
        await DB.changeTask(task, text)
        let newTasks = getState().todo.tasks.map(el => {
            if (el.id === id) {
                return {...el, text: text}
            }
            return el
        })
        updateData(getState().todo.userId, 'tasks', newTasks)
        dispatch(({type: CHANGE_TASK, newTasks}))
    }
}

//Folders
export const addFolder = (newFolder) => {
    return async (dispatch, getState) => {
        await DB.createFolder(newFolder)
        let rfid = getState().todo.removeFolderId
        let folders = getState().todo.folders

        newFolder.id = rfid.length === 0 ? folders.length + 1 : rfid[0]
        let rfID = rfid.length !== 0 ? rfid.filter(el => el !== newFolder.id) : []

        updateData(getState().todo.userId, 'folders', [...getState().todo.folders, newFolder])
        updateData(getState().todo.userId, 'removeFolderId', rfID)
        dispatch(({type: ADD_FOLDER, newFolder, rfID}))
    }
}

export const isChangeFolder = (id, name) => {
    return async (dispatch, getState) => {
        let folder = getState().todo.folders.find(el => el.id === id)
        await DB.changeFolder(folder, name)
        let newFolders = getState().todo.folders.map(el => {
            if (el.id === id) {
                return {...el, name: name}
            }
            return el
        })
        updateData(getState().todo.userId, 'folders', newFolders)
        dispatch({type: CHANGE_FOLDER, newFolders})
    }
}

export const isRemoveFolder = (id) => {
    return async (dispatch, getState) => {
        let tasks = getState().todo.tasks
        let rtID = getState().todo.removeTaskId
        tasks.map(el => {
            if (+el.folderId === id) {
                DB.removeTask(el.id)
                rtID = [...rtID, el.id]
            }
        })
        await DB.removeFolder(id)
        let newFolders = getState().todo.folders.filter(el => el.id !== id)
        let newTasks = getState().todo.tasks.filter(el => +el.folderId !== id)
        updateData(getState().todo.userId, 'folders', newFolders)
        updateData(getState().todo.userId, 'tasks', newTasks)
        let rfID = [...getState().todo.removeFolderId, id]
        updateData(getState().todo.userId, 'removeFolderId', rfID)
        updateData(getState().todo.userId, 'removeTaskId', rtID)
        dispatch({type: REMOVE_FOLDER, newFolders, newTasks, rfID, rtID})
    }
}

export default todoReducer