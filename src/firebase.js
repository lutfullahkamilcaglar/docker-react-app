import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3tWimCcl7r5gUMMlg7bldj5R7RWdW9MI",
  authDomain: "to-do-fe361.firebaseapp.com",
  projectId: "to-do-fe361",
  storageBucket: "to-do-fe361.appspot.com",
  messagingSenderId: "4048007165",
  appId: "1:4048007165:web:a46b5f370cfb79e0ecf394"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)