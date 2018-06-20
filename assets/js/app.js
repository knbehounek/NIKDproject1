// Initialize Firebase

// var config = {
//     apiKey: "AIzaSyBbukVkHU7qdQYVs-Raj2DlPA9t9s1YlO4",
//     authDomain: "nikd-67dbe.firebaseapp.com",
//     databaseURL: "https://nikd-67dbe.firebaseio.com",
//     projectId: "nikd-67dbe",
//     storageBucket: "nikd-67dbe.appspot.com",
//     messagingSenderId: "1041995690239"
//   };
//   firebase.initializeApp(config);

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAQtac_UMR5O5DxdsSlSKJTOXghT_lyLPI",
  authDomain: "gualafon-9f430.firebaseapp.com",
  databaseURL: "https://gualafon-9f430.firebaseio.com",
  projectId: "gualafon-9f430",
  storageBucket: "gualafon-9f430.appspot.com",
  messagingSenderId: "944780830840"
};
firebase.initializeApp(config);



$(document).ready(function () {
  console.log("ready!");

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

      //STORE USER IN SESSION

      // User is signed in.
      document.getElementById("id_button").innerHTML = '<button onclick="logout()" id="id_signout">Logoff</button>';

      document.getElementById("id_private_section").style.display = "block";
      // document.getElementById("id_private_section").style.display = "block";

    } else {
      document.getElementById("id_button").innerHTML = "";

      document.getElementById("id_private_section").style.display = "none";
      // document.getElementById("id_private_section").style.display = "none";


      // No user is signed in.
    }
  });
});



//if user is in session
//SHOW

//else
//do

function login() {
  // window.alert("onclick button works");
  var user_email = document.getElementById("id_email").value;
  var user_password = document.getElementById("id_password").value;

  // console.log("works");
  // console.log(user_email);
  // console.log(user_password);


  firebase.auth().signInWithEmailAndPassword(user_email, user_password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    window.alert("Error Message: " + error.code + "  " + error.message);
  });

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function () {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(user_email, user_password);
  })
  .catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error MSG: " + errorMessage);
  });
}

function logout() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });
}

function registerUser() {

  var user_email_reg = document.getElementById("id_email-reg").value;
  var user_password_reg = document.getElementById("id_password-reg").value;

  firebase.auth().createUserWithEmailAndPassword(user_email_reg, user_password_reg).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    window.alert("Error MSG: " + error.message);
  });
}