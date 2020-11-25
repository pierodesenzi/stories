import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import firebaseConfig from './firebaseConfig'
const firebaseApp = firebase.initializeApp(firebaseConfig)

var db = firebaseApp.firestore()

if (process.env.NODE_ENV == "development" || "testing") {
    firebase.auth().useEmulator('http://localhost:9099/');
    db.useEmulator("localhost", 4040);
}

export default db
