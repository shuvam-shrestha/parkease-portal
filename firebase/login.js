import { signInWithEmailAndPassword } from "firebase/auth";

function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log("User logged in:", userCredential.user);
    })
    .catch(error => {
      console.error("Login error:", error.message);
    });
}
