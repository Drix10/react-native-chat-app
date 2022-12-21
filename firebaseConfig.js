import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDE7BcwE5uhSe-PF47pEBI0Vp7X1bnVTAc",
    authDomain: "chating-app-0001.firebaseapp.com",
    projectId: "chating-app-0001",
    storageBucket: "chating-app-0001.appspot.com",
    messagingSenderId: "401281845865",
    appId: "1:401281845865:web:fb829216363e33973bf0f8"
  };
  
  let app
  if (firebase.getApps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();

  }


const db = app.firestore();
const auth = firebase.auth();

export {db,auth}