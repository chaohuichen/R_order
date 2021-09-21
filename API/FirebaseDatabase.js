import firebase from 'firebase'
import 'firebase/database'
import 'firebase/storage'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBJDnCaeLeZhtt3ZY07AaDu-leEqE9bDB4',
  authDomain: 'classaitvideos-4675b.firebaseapp.com',
  databaseURL: 'https://classaitvideos-4675b-default-rtdb.firebaseio.com',
  projectId: 'classaitvideos-4675b',
  storageBucket: 'classaitvideos-4675b.appspot.com',
  messagingSenderId: '643919684019',
  appId: '1:643919684019:web:61ce86428b016f63422bc6',
  measurementId: 'G-KWYDGMSCPY',
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.database()

export default firebase
