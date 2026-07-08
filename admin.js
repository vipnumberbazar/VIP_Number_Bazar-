import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
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

    await signInWithEmailAndPassword(auth, email, password);

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
    
    owner: document.getElementById("owner").value,
    
    price: Number(document.getElementById("price").value),

    status: document.getElementById("status").value,

    featured: document.getElementById("featured").checked

  });

  alert("VIP Number Added Successfully");
loadList();

};

async function loadList() {
const search = (document.getElementById("searchBox")?.value || "").toLowerCase();
  list.innerHTML = "";

  const snapshot = await getDocs(collection(db, "vipNumbers"));

  const docs = snapshot.docs.sort((a, b) => {
    return (b.data().featured === true) - (a.data().featured === true);
});

docs.forEach((d) => {
    const item = d.data();
if (
String(item.number).toLowerCase().indexOf(search) === -1 &&
String(item.operator).toLowerCase().indexOf(search) === -1
){
    return;
}
    list.innerHTML += `
      <div class="card">

        <h3>${item.number}</h3>

        <p>Operator: ${item.operator}</p>

        <p>Owner: ${item.owner || "-"}</p>

        <p>Price: ₹${item.price}</p>

        <p>Status: ${item.status}</p>

        <button onclick="editNumber('${d.id}')">Edit</button>

        <button onclick="deleteNumber('${d.id}')">Delete</button>

      </div>
    `;

  });
}
window.loadList = loadList;
window.deleteNumber = async function(id){

  if(confirm("Delete this VIP Number?")){

    await deleteDoc(doc(db,"vipNumbers",id));

    loadList();

  }

};

window.editNumber = async function(id){

  const snap = await getDoc(doc(db,"vipNumbers",id));

  const item = snap.data();

  document.getElementById("editId").value = id;
  document.getElementById("editNumber").value = item.number;
  document.getElementById("editOperator").value = item.operator;
  document.getElementById("editOwner").value = item.owner || "";
  document.getElementById("editPrice").value = item.price;
  document.getElementById("editStatus").value = item.status;
  document.getElementById("editFeatured").checked = item.featured || false;

  document.getElementById("editModal").style.display = "flex";

};

window.closeEdit = function(){

  document.getElementById("editModal").style.display = "none";

};

window.saveEdit = async function(){

  const id = document.getElementById("editId").value;

  await updateDoc(doc(db,"vipNumbers",id),{

    number: document.getElementById("editNumber").value,
    operator: document.getElementById("editOperator").value,
    owner: document.getElementById("editOwner").value,
    price: Number(document.getElementById("editPrice").value),
    status: document.getElementById("editStatus").value,
    featured: document.getElementById("editFeatured").checked

  });

  closeEdit();

  loadList();

};

loadList();

window.showOwners = async function () {

  const ownerList = document.getElementById("ownerList");
  ownerList.innerHTML = "";

  const snapshot = await getDocs(collection(db, "vipNumbers"));

  const owners = {};

  snapshot.forEach((doc) => {
    const item = doc.data();

    const owner = item.owner || "Unknown";

    if (!owners[owner]) owners[owner] = [];

    owners[owner].push(item);
  });

  Object.keys(owners).sort().forEach((owner) => {

    const div = document.createElement("div");
    div.className = "owner-card";

    div.innerHTML =
      `👤 ${owner} (${owners[owner].length} Numbers)`;

    div.onclick = () => {

      let html = `<h2>👤 ${owner}</h2><hr>`;

      owners[owner].forEach((n) => {

        html += `
        <div class="card">
          <b>📱 ${n.number}</b><br>
          📡 ${n.operator}<br>
          💰 ₹${n.price}<br>
          🟢 ${n.status}
        </div><br>
        `;

      });

      ownerList.innerHTML = html;

    };

    ownerList.appendChild(div);

  });

  document.getElementById("ownerModal").style.display = "flex";

};

window.closeOwners = function () {

  document.getElementById("ownerModal").style.display = "none";

};
