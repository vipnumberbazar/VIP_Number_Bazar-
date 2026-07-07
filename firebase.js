import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAtl_Mw1vxNn6p4qxGmFEpzOJT2dX_oANs",
  authDomain: "vip-number-bazar-v4.firebaseapp.com",
  projectId: "vip-number-bazar-v4",
  storageBucket: "vip-number-bazar-v4.firebasestorage.app",
  messagingSenderId: "790609030184",
  appId: "1:790609030184:web:767b6a5f4dbc9ed344d91d",
  measurementId: "G-9MG0C15995"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
