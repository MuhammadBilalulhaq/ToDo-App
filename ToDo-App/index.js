import { auth, db } from "./firebase.config.js";

import {
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

let isAuthenticating = false;

onAuthStateChanged(auth, (user) => {

  if (isAuthenticating) {
    return;
  }

  if (user) {
    if (!window.location.pathname.includes("/dashboard/")) {
      window.location.href = "../dashboard/dashboard.html";
    }
  } else {
    if (window.location.pathname.includes("/dashboard/")) {
      window.location.href = "../login/login.html";
    }
  }

});

const login = (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
    });
};

const register = (e) => {
  e.preventDefault();
  isAuthenticating = true;
 const name=document.getElementById("register-UserName").value;
 const number=document.getElementById("register-PhoneNumber").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: name,
        phone: number,
        uid: user.uid,
      });

      window.location.href = "../dashboard/dashboard.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    })
    .finally(() => {
      isAuthenticating = false;
    });
};

const logout = () => {
  signOut(auth);
};

document.getElementById("login-form")?.addEventListener("submit", login);
document.getElementById("register-form")?.addEventListener("submit", register);
document.getElementById("logout")?.addEventListener("click", logout);
