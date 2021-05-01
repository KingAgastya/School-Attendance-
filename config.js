import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAq39oXxWtkKJOfbZjdE3WgFFKB6KMqJ4s",
    authDomain: "school-attendance-e6539.firebaseapp.com",
    databaseURL: "https://school-attendance-e6539-default-rtdb.firebaseio.com",
    projectId: "school-attendance-e6539",
    storageBucket: "school-attendance-e6539.appspot.com",
    messagingSenderId: "1045442682040",
    appId: "1:1045442682040:web:ee1d51a736fb791fb8284d",
    measurementId: "G-SEC2B94T6V"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.database();