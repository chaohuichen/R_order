import firebase from 'firebase'
import 'firebase/database'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_JyA6_wVWHYyCJnRRW6YW8DHNrFmuQ58",
  authDomain: "fdm-supply.firebaseapp.com",
  projectId: "fdm-supply",
  storageBucket: "fdm-supply.appspot.com",
  messagingSenderId: "199780509758",
  appId: "1:199780509758:web:e771736f8724c9c805896f",
  measurementId: "G-S9QNZSXJ47"
};

firebase.initializeApp(firebaseConfig)

export const db = firebase.database()

export default firebase
