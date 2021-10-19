import firebase from 'firebase'
import 'firebase/database'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA40d_8921eduethV_MTeSoytEfLadT29k',
  authDomain: 'fillup-supply-3fe4c.firebaseapp.com',
  databaseURL: 'https://fillup-supply-3fe4c-default-rtdb.firebaseio.com',
  projectId: 'fillup-supply-3fe4c',
  storageBucket: 'fillup-supply-3fe4c.appspot.com',
  messagingSenderId: '909970131020',
  appId: '1:909970131020:web:f44f87ded52c9fa82a8ce9',
  measurementId: 'G-HN6438W6V6',
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.database()

export default firebase
