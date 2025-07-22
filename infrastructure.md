# Drone IoT Platformu – Sistem Altyapı

<img width="623" height="669" alt="image" src="https://github.com/user-attachments/assets/0cd1b945-84eb-4f85-a6b6-013dba2527c8" />

## 🧾 Bileşen Gruplaması

### Hardware
- **Drone**: Uçuş platformu
- **GPS Modülü, IMU (Gyro/Accel)**: Konum ve hareket verisi sağlar
- **FCU (Uçuş Kontrol Kartı)**: Ardupilot veya PX4 firmware çalıştırır
- **CPU (Jetson Nano, Raspberry Pi, vb.)**: Veriyi işler ve MQTT ile iletir

### Firmware
- **Ardupilot / PX4**: Drone’un uçuş ve kontrol yazılımı
- **Telemetry Publisher**: FCU’dan alınan verileri MQTT broker’a yayınlar
- **MQTT Client (C++)**: Komut alımı ve veri gönderimi için kullanılır

### Software
#### Backend
- **Telemetry Service**: Verileri işler, normalize eder
- **Command Service**: Web panelden gelen komutları MQTT üzerinden drone’a iletir
- **Redis**: Anlık telemetri verileri için cache
- **PostgreSQL**: Kalıcı veri deposu (uçuş logları, kullanıcılar, komut geçmişi)
- **Alert Service**:
- **Rule Service**: 


#### Frontend
- **Web Dashboard**: Kullanıcı arayüzü
- **Live Map (Leaflet / Mapbox)**: Anlık drone konumu görselleştirme
- **Command Panel**: Kullanıcıdan komut gönderimi
- **Flight History Viewer**: Geçmiş uçuşların görüntülenmesi
- **Login & Role Management**: Yetkilendirme
---

## Veri Akışı

| Kaynak             | Hedef              | İçerik                          | Protokol |
|--------------------|--------------------|----------------------------------|----------|
| Drone FCU          | CPU                | GPS, IMU, Durum Verileri         | UART/I2C |
| Onboard Computer   | MQTT Broker        | Telemetri JSON                   | MQTT     |
| Web Panel (Kullanıcı) | Backend         | Komutlar, Kimlik Bilgisi         | HTTPS    |
| Backend            | MQTT Broker        | Komut İletimi                    | MQTT     |
| MQTT Broker        | MQTT Client        | Komut Paketi                     | MQTT     |
| Backend            | Redis / PostgreSQL | Telemetri Loglama ve Sorgulama   | TCP/IP   |
| Web Panel          | Redis / PostgreSQL | Anlık Görüntüleme + Geçmiş Uçuş  | HTTP     |

---

## Notlar

- MQTT iletişimi çift yönlüdür: Drone → Broker (telemetri) ve Broker → Drone (komut).
- Redis, anlık veri akışı için performans sağlar; PostgreSQL, uzun dönemli saklama için kullanılır.
---

