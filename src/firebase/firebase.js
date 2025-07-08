// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4IVR911agK8ikyJj2_vdNb9nnAuSmnHI",
  authDomain: "parkease-portal-w0qju.firebaseapp.com",
  projectId: "parkease-portal-w0qju",
  storageBucket: "parkease-portal-w0qju.appspot.com",
  messagingSenderId: "416626382033",
  appId: "1:416626382033:android:138ea4df524a8f833fe1f0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
