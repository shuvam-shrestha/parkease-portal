import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

function signup(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log("User signed up:", userCredential.user);
    })
    .catch(error => {
      console.error("Error signing up:", error.message);
    });
}
