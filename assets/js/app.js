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



// console.log("876543" + user);
// console.log("ready!");
$(document).ready(function () {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("right after statechange, if user, user: " + user.uid);

      //STORE USER IN SESSION

      // User is signed in.
      document.getElementById("is_signed_in").innerHTML = "signed in as " + user.email;
      // document.getElementById("public_content").innerHTML = "Stuff the public can see";
      // document.getElementById("member_content").innerHTML = "Only Signed USers can see this stuff!";
      document.getElementById("not_signed_in").style.display = "none";
      document.getElementById("id_button").innerHTML = '<button onclick="logout()" id="id_signout">Logoff</button>';

      // var uuu = $("#id_private_parts").length;
      // console.log("lenth  "+uuu);
      if ($("#id_private_parts").length) {
        document.getElementById("id_private_parts").style.display = "block";
      }
      // document.getElementById("id_private_con").style.display = "block";
      // console.log("logged in" + user);

      document.getElementById("login_stuff").style.display = "none";
      // location.reload(true);

    } else {
      console.log("right after statechange, if notuser, user: " + user);
      // var uuu = $("#id_private_parts").length;
      // console.log("lngth  "+uuu);
      // document.getElementById("is_signed_in").innerHTML = "";
      // document.getElementById("public_content").innerHTML = "Stuff the public can see";
      // document.getElementById("member_content").innerHTML = "";
      document.getElementById("not_signed_in").innerHTML = "Not Signed in";
      document.getElementById("id_button").style.display = "none";
      document.getElementById("login_stuff").style.display = "block";

      if ($("#id_private_parts").length) {
        document.getElementById("id_private_parts").style.display = "none";
      }
      // location.reload(true);
      // document.getElementById("id_private_con").style.display = "none";
      // console.log("not logged in" + user);


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

  
  // document.getElementById("not_signed_in").innerHTML = "Not Signed in";
  document.getElementById("not_signed_in").style.display = "none";

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

  document.getElementById("id_button").innerHTML = '<button onclick="logout()" id="id_signout">Logoff</button>';
}

function logout() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  


  }).catch(function (error) {
    // An error happened.
  });

  document.getElementById("not_signed_in").innerHTML = "Not Signed in";
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