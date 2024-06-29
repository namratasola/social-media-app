import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDttRrMGdeFOs4vEEdT2taoMyGIjw4zFaw",
    authDomain: "auth-dd199.firebaseapp.com",
    projectId: "auth-dd199",
    storageBucket: "auth-dd199.appspot.com",
    messagingSenderId: "551650668300",
    appId: "1:551650668300:web:667d849f11618db2942329",
    measurementId: "G-YMGXSMGHTX"
  };

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();