import firebase from "firebase/app";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZHdHbrjxqLj4c76ulQFolfmzhem7sd4E",
  authDomain: "toe2toe-9c62d.firebaseapp.com",
  projectId: "toe2toe-9c62d",
  storageBucket: "toe2toe-9c62d.appspot.com",
  messagingSenderId: "1005715617739",
  appId: "1:1005715617739:web:ebd63cb44920fb8d6f684e",
  measurementId: "G-0PKE8Q4TWK",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
