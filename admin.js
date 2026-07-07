import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const auth = getAuth();

window.login = async function () {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    document.querySelector(".login-box").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    loadList();

  } catch (e) {

    document.getElementById("msg").innerHTML = e.message;

  }

};

window.logout = async function () {

  await signOut(auth);
  location.reload();

};

window.addNumber = async function () {

  await addDoc(collection(db, "vipNumbers"), {

    number: document.getElementById("number").value,

    operator: document.getElementById("operator").value,

    price: Number(document.getElementById("price").value),

    status: document.getElementById("status").value,

    featured: document.getElementById("featured").checked

  });

  alert("VIP Number Added Successfully");

  loadList();

};
async function loadList() {

  const list = document.getElementById("list");

  list.innerHTML = "";

  const snapshot = await getDocs(collection(db, "vipNumbers"));

  snapshot.forEach((d) => {

    const item = d.data();

    list.innerHTML += `
      <div class="card">

        <h3>${item.number}</h3>

        <p>Operator: ${item.operator}</p>

        <p>Price: ₹${item.price}</p>

        <p>Status: ${item.status}</p>

        <button onclick="editNumber('${d.id}')">
          Edit
        </button>

        <button onclick="deleteNumber('${d.id}')">
          Delete
        </button>

      </div>
    `;

  });

}
window.deleteNumber = async function(id){

  if(confirm("Delete this VIP Number?")){

    await deleteDoc(doc(db,"vipNumbers",id));

    loadList();

  }

}

window.editNumber = async function(id){

  const newPrice = prompt("Enter New Price");

  if(newPrice){

    await updateDoc(doc(db,"vipNumbers",id),{

      price:Number(newPrice)

    });

    loadList();

  }

}

loadList();
