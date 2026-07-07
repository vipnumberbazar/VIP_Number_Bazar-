import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import {
getAuth,
signInWithEmailAndPassword,
signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const auth = getAuth();

window.login = async function(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

document.querySelector(".login-box").style.display="none";
document.getElementById("dashboard").style.display="block";

}catch(e){

document.getElementById("msg").innerHTML=e.message;

}

}

window.logout = async function(){

await signOut(auth);
location.reload();

}

window.addNumber = async function(){

await addDoc(collection(db,"vipNumbers"),{

number:document.getElementById("number").value,

operator:document.getElementById("operator").value,

price:Number(document.getElementById("price").value),

status:document.getElementById("status").value,

featured:document.getElementById("featured").checked

});

alert("VIP Number Added Successfully");

location.reload();

}
