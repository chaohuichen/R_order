import firebase from 'firebase'
import 'firebase/database'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDISHrqDskVoRk4xNUY2FV2bxS9VHXlG7I',
  authDomain: 'coffee-app-575a6.firebaseapp.com',
  databaseURL: 'https://coffee-app-575a6-default-rtdb.firebaseio.com',
  projectId: 'coffee-app-575a6',
  storageBucket: 'coffee-app-575a6.appspot.com',
  messagingSenderId: '307141550296',
  appId: '1:307141550296:web:5dbbacaea107d99163b7ad',
  measurementId: 'G-H24RX3REPS',
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.database()

export default firebase
