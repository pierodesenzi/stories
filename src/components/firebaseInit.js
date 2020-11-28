import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import firebaseConfig from './firebaseConfig'
const firebaseApp = firebase.initializeApp(firebaseConfig)

var db = firebaseApp.firestore()

if (process.env.NODE_ENV == "development" || "testing") {
    firebase.auth().useEmulator('http://localhost:9099/');
    firebase.auth().createUserWithEmailAndPassword ('rivelino@gmail.com', '123456')
    .then(user => {
        user.user.updateProfile({
          displayName: 'Rivelino10',
        })
        .then(sucess => {
          console.log('Mock user created')
          firebase.auth().signOut()
        })
    })
    .catch(error => {})
    db.useEmulator("localhost", 4040);
}

export default db
