
import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let vipNumbers = [];

const container = document.getElementById("numbers");

async function loadNumbers() {
  const querySnapshot = await getDocs(collection(db, "vipNumbers"));

  vipNumbers = [];

  querySnapshot.forEach((doc) => {
    vipNumbers.push(doc.data());
  });

  showNumbers(vipNumbers);
}
function searchNumber(){

const text=document
.getElementById("searchBox")
.value
.toLowerCase();

const result = vipNumbers.filter(item =>
item.number.replace(/\s/g,"").includes(text.replace(/\s/g,""))
);

showNumbers(result);

}
function filterOperator(operator){

if(operator==="All"){
showNumbers(vipNumbers);
return;
}

const result = vipNumbers.filter(item => item.operator===operator);

showNumbers(result);

}
