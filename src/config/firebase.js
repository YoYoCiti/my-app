import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBJXl4OgEzZsjVYruQrHm0pWk0qSjYNYUA",
  authDomain: "plan-et-6be4e.firebaseapp.com",
  projectId: "plan-et-6be4e",
  storageBucket: "plan-et-6be4e.appspot.com",
  messagingSenderId: "238966307669",
  appId: "1:238966307669:web:a3ea99527b942386b0cddc",
});

export const auth = firebaseConfig.auth();
export default firebaseConfig;
