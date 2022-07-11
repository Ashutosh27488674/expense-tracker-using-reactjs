import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBLj5a_hkuorambfMCNoLnkDuzhwo8EKis",
    authDomain: "expense-tracker-97721.firebaseapp.com",
    databaseURL: "https://expense-tracker-97721-default-rtdb.firebaseio.com",
    projectId: "expense-tracker-97721",
    storageBucket: "expense-tracker-97721.appspot.com",
    messagingSenderId: "774674997746",
    appId: "1:774674997746:web:06a48e2727829b7ca88b6b"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);