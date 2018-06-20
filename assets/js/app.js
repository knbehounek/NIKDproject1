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

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
      // User is signed in.
      document.getElementById("is_signed_in").innerHTML = "signed in";
      document.getElementById("public_content").innerHTML = "Stuff the public can see";
      document.getElementById("member_content").innerHTML = "Only Signed USers can see this stuff!";
      document.getElementById("not_signed_in").innerHTML = "";
      document.getElementById("id_button").innerHTML = '<button onclick="logout()" id="id_signout">Logoff</button>';

  } else {
      document.getElementById("is_signed_in").innerHTML = "";
      document.getElementById("public_content").innerHTML = "Stuff the public can see";
      document.getElementById("member_content").innerHTML = "";
      document.getElementById("not_signed_in").innerHTML = "Not Signed in";
      document.getElementById("id_button").innerHTML = "";


      // No user is signed in.
  }
});

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
}

function logout() {
  firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
}

function registerUser() {

  var user_email_reg = document.getElementById("id_email-reg").value;
  var user_password_reg = document.getElementById("id_password-reg").value;

  firebase.auth().createUserWithEmailAndPassword(user_email_reg, user_password_reg).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      window.alert("Error MSG: " + error.message);
    });
}