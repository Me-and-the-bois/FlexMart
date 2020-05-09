import firebase from 'firebase/app';
import 'firebase/storage';



// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD4TQdSSe3srvsmtExTqNX2MECcDjlTRJc",
    authDomain: "flexmart-9e91e.firebaseapp.com",
    databaseURL: "https://flexmart-9e91e.firebaseio.com",
    projectId: "flexmart-9e91e",
    storageBucket: "flexmart-9e91e.appspot.com",
    messagingSenderId: "1056849544702",
    appId: "1:1056849544702:web:d359c78a6ba39221676caf",
    measurementId: "G-VPH2ZXHE68"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage, firebase as default};