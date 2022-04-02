import firebase from 'firebase'
import 'firebase/database'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCzkr4B5pYRliiSCjoVw4SBMWfAayLaC_4',
  authDomain: 'tgghq-orderapp.firebaseapp.com',
  projectId: 'tgghq-orderapp',
  storageBucket: 'tgghq-orderapp.appspot.com',
  messagingSenderId: '202819861824',
  appId: '1:202819861824:web:f7248ccdd9e9ef09804ea5',
  measurementId: 'G-HQLQV84RTN',
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.database()

export default firebase
