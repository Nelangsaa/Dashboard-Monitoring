#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <ESP32Servo.h>


// Konfigurasi Firebase
#define FIREBASE_HOST "https://tamasadepan-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "oJDrkbPxvCkGYSyfH05UjnnDXuy7UvDoNjyiy97d"

// Konfigurasi WiFi
#define WIFI_SSID "APTA"
#define WIFI_PASSWORD "12345678"

// Objek Firebase
FirebaseData firebaseData;
FirebaseAuth auth;
FirebaseConfig config;

// Pin Relay
#define PIN_LED1 2  // Relay pertama di pin 2
#define PIN_LED2 4  // Relay kedua di pin 4

Servo myservo;  // Buat objek servo

const int servoPin = 13;  // Pin yang terhubung ke servo    

void setup() {
    Serial.begin(115200);

    // Inisialisasi pin relay sebagai output
    pinMode(PIN_LED1, OUTPUT);
    pinMode(PIN_LED2, OUTPUT);
    digitalWrite(PIN_LED1, HIGH); // Matikan relay (relay biasanya aktif LOW)
    digitalWrite(PIN_LED2, HIGH);

    // Koneksi ke WiFi
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Menghubungkan ke WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }
    Serial.println("\nTerhubung ke WiFi!");

    // Konfigurasi Firebase
    config.database_url = FIREBASE_HOST;
    config.signer.tokens.legacy_token = FIREBASE_AUTH;
    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);

    myservo.attach(servoPin);  // Menghubungkan objek servo ke pin
}

void loop() {
    String status_led1;
    String status_led2;

    // Membaca status relay1 dari Firebase
    if (Firebase.RTDB.getString(&firebaseData, "relay/led1")) {
        status_led1 = firebaseData.stringData();
        Serial.print("Status LED1: ");
        Serial.println(status_led1);

        // Mengontrol relay 1 berdasarkan data dari Firebase
        if (status_led1 == "ON") {
            digitalWrite(PIN_LED1, HIGH);  // Aktifkan relay (relay aktif LOW)
        } else {
            digitalWrite(PIN_LED1, LOW); // Matikan relay
        }
    } else {
        Serial.print("Gagal membaca relay1: ");
        Serial.println(firebaseData.errorReason());
    }

    // Membaca status relay2 dari Firebase
    if (Firebase.RTDB.getString(&firebaseData, "relay/led2")) {
        status_led2 = firebaseData.stringData();
        Serial.print("Status LED2: ");
        Serial.println(status_led2);
        

        // Mengontrol relay 2 berdasarkan data dari Firebase
        if (status_led2 == "ON") {
            digitalWrite(PIN_LED2, HIGH);  // Aktifkan relay (relay aktif LOW)
            

        } else {
            digitalWrite(PIN_LED2, LOW); // Matikan relay
            

        }
    } else {
        Serial.print("Gagal membaca relay2: ");
        Serial.println(firebaseData.errorReason());
        

    }

    Serial.println("_____________________________________");
  

    
    // servo
    
    for (int pos = 0; pos <= 180; pos += 1) {  // Pergi dari 0 derajat ke 180 derajat
    myservo.write(pos);  // Mengatur posisi servo
    Serial.print("derajat sevo : ");
    Serial.println(pos);
    delay(15);  // Tunggu 15 ms untuk servo mencapai posisi
  }
 
  
  for (int pos = 180; pos >= 0; pos -= 1) {  // Pergi dari 180 derajat ke 0 derajat
    myservo.write(pos);  // Mengatur posisi servo
     Serial.print("derajat sevo : ");
    Serial.println(pos);
     
    delay(15);  // Tunggu 15 ms untuk servo mencapai posisi
  }
  
    


}
