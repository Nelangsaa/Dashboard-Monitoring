// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBZiJkvsqKnv4IJBphsBiqbco5Zp5_TUOM",
  authDomain: "tamasadepan.firebaseapp.com",
  databaseURL: "https://tamasadepan-default-rtdb.firebaseio.com",
  projectId: "tamasadepan",
  storageBucket: "tamasadepan.firebasestorage.app",
  messagingSenderId: "168503052372",
  appId: "1:168503052372:web:6c53f1afbd35d7748085c1",
  measurementId: "G-DYL9TD5BR3",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// LOGIN FUNCTION
document.getElementById("loginBtn")?.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html"; // Redirect ke dashboard
    })
    .catch((error) => {
      document.getElementById("message").innerText = "Error: " + error.message;
    });
});

// LOGOUT FUNCTION
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.href = "index.html"; // Redirect ke login setelah logout
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
});

// PROTEKSI HALAMAN DASHBOARD
onAuthStateChanged(auth, (user) => {

  const path = window.location.pathname;

  if (
    path.endsWith("dashboard.html")||
    path.endsWith("control.html")||
    path.endsWith("database.html")
  ) {
    if (!user) {
      window.location.href = "index.html"; // Redirect ke login jika belum login
    }
  }
});
