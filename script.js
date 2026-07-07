import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let vipNumbers = [];

const container = document.getElementById("numbers");

async function loadNumbers() {
  try {
    const querySnapshot = await getDocs(collection(db, "vipNumbers"));

    vipNumbers = [];

    querySnapshot.forEach((doc) => {
      vipNumbers.push(doc.data());
    });

    showNumbers(vipNumbers);
  } catch (e) {
    console.error(e);
    container.innerHTML = "<h2>Data Load Error</h2>";
  }
}

function showNumbers(list) {
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<h2>No VIP Numbers Found</h2>";
    return;
  }

  list.forEach(item => {
    container.innerHTML += `
      <div class="card">
        <h2>${item.number}</h2>

        <p><b>Operator:</b> ${item.operator}</p>

        <p><b>Price:</b> ₹${item.price}</p>

        <p><b>Status:</b> ${item.status}</p>

        <a class="buy-btn"
        href="https://wa.me/918070424242?text=I want VIP Number ${item.number}">
        Book Now
        </a>

      </div>
    `;
  });
}

function searchNumber() {

  const text = document
    .getElementById("searchBox")
    .value
    .toLowerCase();

  const result = vipNumbers.filter(item =>
    item.number.replace(/\s/g, "").includes(text.replace(/\s/g, ""))
  );

  showNumbers(result);
}

function filterOperator(operator) {

  if (operator === "All") {
    showNumbers(vipNumbers);
    return;
  }

  const result = vipNumbers.filter(item => item.operator === operator);

  showNumbers(result);
}

window.searchNumber = searchNumber;
window.filterOperator = filterOperator;

loadNumbers();
