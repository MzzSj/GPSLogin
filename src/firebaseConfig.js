import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-5KRgZzAQesxeJSHoXrMP5Z2gIiaV8fM",
  authDomain: "gsplogin-a5e22.firebaseapp.com",
  databaseURL: "https://gsplogin-a5e22-default-rtdb.firebaseio.com",
  projectId: "gsplogin-a5e22",
  storageBucket: "gsplogin-a5e22.appspot.com",
  messagingSenderId: "720658647445",
  appId: "1:720658647445:web:0b07afa515b881f9f54e9c"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get the authentication object
const auth = getAuth(app);

export { auth, app };
