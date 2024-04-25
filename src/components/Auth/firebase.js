import { FirebaseApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
  
const firebaseConfig = {
  apiKey: "AIzaSyCjHfS1vOAp7flpAkvXKeLMhj6-H7-vDhg",
  authDomain: "authotp-f0566.firebaseapp.com",
  projectId: "authotp-f0566",
  storageBucket: "authotp-f0566.appspot.com",
  messagingSenderId: "213841127085",
  appId: "1:213841127085:web:e1261f4318db5f11ffc824"
};
  //const app = initializeApp(firebaseConfig);
FirebaseApp.initializeApp(firebaseConfig);
//var auth = firebase.auth();
const auth = getAuth(app);
export {firebase,auth};

