import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc, getDocs
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
  
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let register = document.getElementById("register-btn");

register.addEventListener("click", function () {
  let name = document.getElementById("name");
  let phone = document.getElementById("phone");
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  let userData = {
    name: name.value,
    phone: phone.value,
    email: email.value,
    password: password.value,
  };

  
  createUserWithEmailAndPassword(auth, userData.email, userData.password)
    .then(async ( userCredential) => {
      // Signed in
      const user = userCredential.user;
      // console.log(user)
      try {
        const docRef = await addDoc(collection(db, "users"), {
         ...userData,
         uid : user.uid
         
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error message", errorMessage)
    });
});



let getAllUsers = async ()=>{

  const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} =>`, doc.data());
});
}