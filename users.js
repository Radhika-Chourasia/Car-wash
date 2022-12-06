/* Below code will work if u convert elements(<p>)
to buttons-


document.getElementById('linkCreateAccount').addEventListener('click',function(){
  document.getElementById('register').style.display="inline";
  document.getElementById('login').style.display="none";
})


document.getElementById('linkLogin').addEventListener('click',function(){
  document.getElementById('register').style.display="none";
  document.getElementById('login').style.display="inline";
})

*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword ,createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase,update,child,set, get, ref } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

  

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
  




document.addEventListener("DOMContentLoaded", () => {
  const login = document.querySelector("#login");
  const register = document.querySelector("#register");

  document.querySelector("#linkCreateAccount").addEventListener("click", e => {
      e.preventDefault();
      login.classList.add("form--hidden");
      register.classList.remove("form--hidden");
  });

  document.querySelector("#linkLogin").addEventListener("click", e => {
      e.preventDefault();
      login.classList.remove("form--hidden");
      register.classList.add("form--hidden");
  });
});





onAuthStateChanged(auth,  (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;

    const dbRef = ref(database);
    get(child(dbRef, `users/${uid}`))
    
      .then((snapshot) => {
          if (snapshot.exists()) {
              alert("Active user found!");
              window.location="users_home.html";
        //console.log(snapshot.val());
          } 
      }).catch((error) => {
          console.log(error);
      });

   
    
    
    // ...
  } 
  
});





document.getElementById("register_btn").addEventListener('click',function(){

  const email = document.getElementById('register_email').value;
  const password = document.getElementById('register_password').value;
  const full_name = document.getElementById('full_name').value;
  
  

  createUserWithEmailAndPassword(auth, email, password,full_name)
  .then((userCredential) => {
    const user = userCredential.user;
    //const dbref=ref(database);
   
    // does not adds the user with same name as well as with same email 
    
  
    /*get(child(dbref,'users/'+full_name)).then((snapshot)=>{
      if(snapshot.exists() && snapshot.val().email===email ){
        alert("Account already exists!");
      
    }
    else{*/
    
      set(ref(database, 'users/'+user.uid), {  //user.uid
        //UID: user.uid,
        Fullname: full_name, 
        email: email,
        
    })
    .then(()=>{
      
      alert("User created successfully! Signing you in...");
      //document.getElementById('register').style.display="none";
      //document.getElementById('login').style.display="inline";
      //window.location="users_home.html";
      

    })
    .catch((error)=>{
      alert(error);
    });
    //}

  })
  .catch((error) => {
    //const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });


//});

});














document.getElementById("login_btn").addEventListener('click',function(){

  const email = document.getElementById('login_email').value;
  const password = document.getElementById('login_password').value;


  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;

    update(ref(database, 'users/'+user.uid), {  //user.uid
    
      Last_login: new Date(),
    
    //Last_login:
  })
  .then(()=>{
    alert("User logged in successfully!");
    //window.location="users_home.html";
  
  })
  .catch((error)=>{
    alert(error);
  });

})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);

  });


});


















/*const firebaseConfig = {
    apiKey: "AIzaSyCIh3WM3toVto_pPrnP7VSQAzFZg1qXGvo",
    authDomain: "car-wash-baef3.firebaseapp.com",
    projectId: "car-wash-baef3",
    storageBucket: "car-wash-baef3.appspot.com",
    messagingSenderId: "314232474215",
    appId: "1:314232474215:web:f593d7c9c6239b4d3ea2c2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize variables
const auth = app.auth()
const database = app.getDatabase()



// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email_reg').value
  password = document.getElementById('password_reg').value
  full_name = document.getElementById('full_name').value


// Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Wrong!!')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false){
    alert('One or More Extra Fields is Wrong!!')
    return
  }


  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}





// Validate Functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }*/










  
