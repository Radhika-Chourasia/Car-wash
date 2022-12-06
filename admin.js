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
      alert("Active user found");
      window.location="admin_home.html";
      // ...
    } 
    
  });


  document.getElementById("login_btn").addEventListener('click',function(){

    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;
  
  
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      const dbRef = ref(database);
    get(child(dbRef, 'admin/'+user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
            update(ref(database, 'admin/'+user.uid), {  //user.uid
    
                Last_login: new Date(),
             
            })
            .then(()=>{
              //alert("User logged in successfully!");
              //window.location="admin_home.html";
            
            })
            .catch((error)=>{
              alert(error);
            });


        
        } else {
            
            set(ref(database, 'admin/'+user.uid), {  //user.uid
                //UID: user.uid,
                //Fullname: full_name, 
                email: email,
                
            })
            .then(()=>{
              //alert("User Signed In successfully!");
              //window.location="admin_home.html";
        
            })
            .catch((error)=>{
              alert(error);
            });



        }
        }).catch((error) => {
            console.error(error);
        });
  
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
  
    });
  
  
  });
  
  