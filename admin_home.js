import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword ,signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase,child,update, set, get, ref } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

  

  const firebaseConfig = {
    apiKey: "AIzaSyA0LNB8yRF8qRZ2lm-jD6itFts_CU4I3sg",
    authDomain: "car-wash1-f656f.firebaseapp.com",
    databaseURL: "https://car-wash1-f656f-default-rtdb.firebaseio.com",
    projectId: "car-wash1-f656f",
    storageBucket: "car-wash1-f656f.appspot.com",
    messagingSenderId: "947877209950",
    appId: "1:947877209950:web:b4dbdda08e3ad0b43a91cf",
    measurementId: "G-1BQQEFJ38Q"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth= getAuth(app);
  const database= getDatabase(app);


  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;

      // ...
    } else{
        window.location="users.html";
    }
    
  });



  document.querySelector("#signoutlink").addEventListener("click", e => {
    e.preventDefault();
    
        signOut(auth).then(() => {
            // Sign-out successful.
            window.location= "users.html";
          }).catch((error) => {
            alert(error);
            // An error happened.
          });
});
