import firebase from 'firebase'
import 'firebase/database'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDvPa9ZkEWVcRFVPHsZQrhx-I3OShCv-VM',
  authDomain: 'restaurants-order-96d22.firebaseapp.com',
  databaseURL: 'https://restaurants-order-96d22-default-rtdb.firebaseio.com',
  projectId: 'restaurants-order-96d22',
  storageBucket: 'restaurants-order-96d22.appspot.com',
  messagingSenderId: '1031880740685',
  appId: '1:1031880740685:web:62acbbdb582a48bb2fb104',
  measurementId: 'G-B52FLT1PHP',
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.database()

export default firebase
