# MVP Feature List – Drone Delivery IoT Platform

Bu proje, teslimat yapabilen drone’ların izlenmesini, komutlarla yönetilmesini ve geçmiş verilerin raporlanmasını sağlayan bir IoT platformunun MVP sürümünü hedeflemektedir.

## Amaç
- Gerçek zamanlı telemetri takibi (lokasyon, batarya, hız)
- Drone'lara komut gönderme (örneğin: "Land", "Cancel")
- Uçuş geçmişinin kayıt altına alınması ve görselleştirilmesi
- Web tabanlı kullanıcı arayüzü ile etkileşimli yönetim

---

## MVP Feature Kategorileri

### 1. Telemetri Takibi

- [ ] MQTT broker kurulumu (Mosquitto)
- [ ] MQTT üzerinden telemetri verisi alma
- [ ] Telemetri verisini veritabanına yazma (konum, batarya, hız vb.)
- [ ] Anlık verilerin REST API ile servis edilmesi

### 2. Drone Komutları

- [ ] MQTT üzerinden komut gönderme (land, pause, cancel)
- [ ] Komut API’si (REST veya WebSocket)
- [ ] Komut gönderim durumu ve yanıt takibi

### 3. Harita Tabanlı Yönetim Arayüzü (Web UI)

- [ ] React tabanlı frontend yapılandırması
- [ ] Aktif drone’ların harita üzerinde gösterimi
- [ ] Drone detaylarının panelde gösterimi (id, batarya, hız)
- [ ] Komut gönderme paneli (button veya dropdown arayüzü)

### 4. Uçuş Geçmişi & Raporlama

- [ ] Uçuş başlangıç/bitiş belirleme (telemetri üzerinden)
- [ ] Uçuş kayıtlarının listelenmesi
- [ ] Uçuş detaylarının görselleştirilmesi (başlangıç, bitiş, rota)

### 5. Kullanıcı Sistemi & Yetkilendirme

- [ ] JWT tabanlı kullanıcı doğrulama
- [ ] Admin ve Operator rolleri
- [ ] Giriş ekranı ve session yönetimi

### 6. Uyarı Sistemi (Alerting)

- [ ] Kritik durumlar için uyarılar (örneğin batarya < %20)
- [ ] Uyarıların kullanıcı arayüzünde gösterimi

### 7. Altyapı & DevOps

- [ ] Docker Compose ile servis orkestrasyonu
- [ ] PostgreSQL kurulumu ve konfigürasyonu
- [ ] Temel loglama ve hata yönetimi

---

## İzlenecek Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Frontend | React.js/Next.js, Leaflet.js |
| Backend | FastAPI / Express.js |
| Messaging | MQTT (Mosquitto) |
| Database | PostgreSQL |
| Cache | Redis |
| Auth | JWT |
| DevOps | Docker |

---

## Sonraki Aşamalar (MVP Sonrası)

- Gelişmiş görev planlama
- Drone teslimat rota optimizasyonu
- Kullanıcıya özel dashboard
- Coğrafi sınır ihlali uyarı sistemi (Geo-fence)
- Mobil uygulama desteği



