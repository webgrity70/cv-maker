import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration for personal ac

/* 
const firebaseConfig = {
  apiKey: "AIzaSyDdtTJ1bGL1uMYOzUiqhPBckoeb6Rb5vis",
  authDomain: "cv-maker-279a3.firebaseapp.com",
  projectId: "cv-maker-279a3",
  storageBucket: "cv-maker-279a3.appspot.com",
  messagingSenderId: "618618360541",
  appId: "1:618618360541:web:63cd379ae92c87ee1c8134"
};
 */

// Your web app's Firebase configuration webgrity70

const firebaseConfig = {

  apiKey: "AIzaSyDs_BPJTX8gsDMjpf4GYayqTcZPz0hURgY",
  authDomain: "cv-maker-d4431.firebaseapp.com",
  databaseURL: "https://cv-maker-d4431-default-rtdb.firebaseio.com",
  projectId: "cv-maker-d4431",
  storageBucket: "cv-maker-d4431.appspot.com",
  messagingSenderId: "193176232714",
  appId: "1:193176232714:web:c47608a30d49bd7d4250f3"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

export const auth = getAuth(app)