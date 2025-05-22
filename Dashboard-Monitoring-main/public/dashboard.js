import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

/* =============== BAGIAN 2: Konfigurasi Firebase =============== */
// Konfigurasi aplikasi Firebase berdasarkan informasi proyek Anda
const firebaseConfig = {
    apiKey: "AIzaSyBZiJkvsqKnv4IJBphsBiqbco5Zp5_TUOM",
    authDomain: "tamasadepan.firebaseapp.com",
    databaseURL: "https://tamasadepan-default-rtdb.firebaseio.com",
    projectId: "tamasadepan",
    storageBucket: "tamasadepan.firebasestorage.app",
    messagingSenderId: "168503052372",
    appId: "1:168503052372:web:6c53f1afbd35d7748085c1",
    measurementId: "G-DYL9TD5BR3"
  };
  

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// **Mendapatkan elemen tombol status dari HTML**
const temp = document.getElementById("data_sensor");

/* =============== BAGIAN 3: Fungsi Membaca Data Sensor dari Firebase =============== */
// Fungsi untuk membaca data terbaru dari Firebase dan menampilkannya di HTML
function updateSensorData() {
  const sensorRef = ref(db, "/data_sensor"); // Mengambil referensi data sensor di database

  onValue(sensorRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val(); // Mengambil data terbaru dari Firebase

      // Memperbarui tampilan suhu dan kelembapan di HTML
      document.getElementById("data_suhu").textContent = data.suhu.toFixed(2);
      document.getElementById("data_kelembapan").textContent =
        data.kelembapan.toFixed(2);
    } else {
      console.log("No data available"); // Jika data tidak ditemukan
    }
  });
}

/* =============== BAGIAN 4: Menjalankan Fungsi Saat Halaman Dimuat =============== */
// Memanggil fungsi untuk memperbarui data sensor saat halaman pertama kali dimuat
updateSensorData();