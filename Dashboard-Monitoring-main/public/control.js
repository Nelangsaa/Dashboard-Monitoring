/* =============== BAGIAN 1: Import Modul Firebase =============== */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

/* =============== BAGIAN 2: Konfigurasi Firebase =============== */
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
const db = getDatabase(app);

/* =============== BAGIAN 3: Ambil Elemen HTML =============== */
const relay1Switch = document.getElementById("relay1_switch");
const relay2Switch = document.getElementById("relay2_switch");
const statusBtn1 = document.getElementById("status_button1");
const statusBtn2 = document.getElementById("status_button2");

/* =============== BAGIAN 4: Referensi ke Database =============== */
const relay1Ref = ref(db, "relay/led1");
const relay2Ref = ref(db, "relay/led2");

/* =============== BAGIAN 5: Sinkronisasi Status Database ke UI =============== */
function initRelayListeners() {
  onValue(relay1Ref, (snapshot) => {
    if (snapshot.exists()) {
      const status = snapshot.val();
      relay1Switch.checked = status === "ON";
      statusBtn1.textContent = status;
    }
  });

  onValue(relay2Ref, (snapshot) => {
    if (snapshot.exists()) {
      const status = snapshot.val();
      relay2Switch.checked = status === "ON";
      statusBtn2.textContent = status;
    }
  });
}

/* =============== BAGIAN 6: Event Listener untuk Kontrol Relay =============== */
relay1Switch.addEventListener("change", () => {
  const newStatus = relay1Switch.checked ? "ON" : "OFF";
  set(relay1Ref, newStatus).catch((err) =>
    console.error("Gagal set relay 1:", err)
  );
});

relay2Switch.addEventListener("change", () => {
  const newStatus = relay2Switch.checked ? "ON" : "OFF";
  set(relay2Ref, newStatus).catch((err) =>
    console.error("Gagal set relay 2:", err)
  );
});

/* =============== BAGIAN 7: Inisialisasi Program =============== */
initRelayListeners();
