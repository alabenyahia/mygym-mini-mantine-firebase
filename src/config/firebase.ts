import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBaypAkEcXgsazJYoCONwSlZHkv5qwh9AA",
  authDomain: "mygym-mini-mantine.firebaseapp.com",
  projectId: "mygym-mini-mantine",
  storageBucket: "mygym-mini-mantine.appspot.com",
  messagingSenderId: "934841169169",
  appId: "1:934841169169:web:db1be8d5a6591d818308b0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);