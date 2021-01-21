import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('post.db')


export const DB = {
    init: () =>{
        return new Promise((resolve, reject) =>{
            db.transaction(tx =>{
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, folderId TEXT, checked INT, text TEXT NOT NULL)',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS folders (id INTEGER PRIMARY KEY NOT NULL, color TEXT NOT NULL, name TEXT NOT NULL)',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    },

    getFolders: () =>{
        return new Promise((resolve, reject) =>{
            db.transaction(tx =>{
                tx.executeSql(
                    'SELECT * FROM folders',
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    },

    createFolder: ({color, name}) =>{
        return new Promise((resolve, reject) =>{
            db.transaction(tx =>{
                tx.executeSql(
                    'INSERT INTO folders (color, name) VALUES (?, ?)',
                    [color, name],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    },

    changeFolder: (folder, name) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE folders SET name = ? WHERE id = ?',
                    [folder.name = name, folder.id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    },

    removeFolder: (id) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM folders WHERE id = ?',
                    [id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    },

    deleteAllFolders: () =>{
        return new Promise((resolve, reject) =>{
            db.transaction(tx =>{
                tx.executeSql(
                    'DELETE FROM folders',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    },

    // Tasks
    getTasks: () =>{
        return new Promise((resolve, reject) =>{
            db.transaction(tx =>{
                tx.executeSql(
                    'SELECT * FROM tasks',
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    },

    createTask: ({folderId, checked, text}) =>{
        return new Promise((resolve, reject) =>{
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO tasks (checked, folderId, text) VALUES (?, ?, ?)',
                    [checked, folderId, text],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    },

    checkedTask: (task) => {
        return new Promise((resolve,reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE tasks SET checked = ? WHERE id = ?',
                    [task.checked ? 0 : 1, task.id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    },

    changeTask: (task, text) => {
        return new Promise((resolve,reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE tasks SET text = ? WHERE id = ?',
                    [task.text = text, task.id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    },

    removeTask: (id) =>{
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM tasks WHERE id = ?',
                    [id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    },

    deleteAllTasks: () =>{
        return new Promise((resolve, reject) =>{
            db.transaction(tx =>{
                tx.executeSql(
                    'DELETE FROM tasks',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    },
}