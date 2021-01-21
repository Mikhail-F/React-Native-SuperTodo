// Your web app's Firebase configuration
import firebase from 'firebase';

const firebaseConfig = {
...
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const authUserApi = {
    login(email, password){
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => response.user)
    },

    registration(email, password){
        return firebase.auth().createUserWithEmailAndPassword(email, password)
    },

    out(){
        return firebase.auth().signOut()
    },

    forgetPassword(email){
        return firebase.auth().sendPasswordResetEmail(email)
    },

    findUser(uid){
        return firebase.database().ref(uid).orderByKey().once('value')
    }
}

export const userDataApi = {
    updateUserData(id, type, obj){
        return firebase.database().ref(`${id}/${type}`).set(obj);
    }
}