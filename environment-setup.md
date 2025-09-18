1. Docker kurulumu


2. pgAdmin kurulumu
Download: https://www.pgadmin.org/download/
Kurulum sonrası pgAdmin’i aç.

Yeni Server Bağlantısı Ekle
Sol panelde “Servers” → sağ tık → Register → “Server…”

General Tab:
Name: havadash-postgres

Connection Tab:
Host name/address: localhost
Port: 5432
Maintenance database: postgres
Username: myuser
Password: mypassword
Save password? → işaretle

Bağlantıyı Test Et

Save tıkla → Sol panelde server bağlandıysa yeşil simge görünecek
Databases → havadashdb → Schemas → public → Tables altında tabloları görebilirsin


3. MQTT Explorer Kurulumu
Web sitesi: mqtt-explorer.com
Platformlar: Windows, macOS, Linux
Kurulum: Sitesinden direkt indirme veya paket yöneticisi üzerinden yükleme

Broker’a Bağlanma
Host: localhost
Port: 1883 (standart MQTT portu)
Protocol: MQTT (v3.1.1 veya v5.0)
Username / Password: Şu an allow_anonymous true olduğu için boş bırakabilirsin


Kullanımı
Explorer’ı aç → New Connection → Host ve Port bilgilerini gir
Connect’e tıkla

Sol panelde tüm topic’leri görebilir, mesaj yayınlayabilir veya subscribe olabilirsin

Test
docker exec -it havadash_mosquitto mosquitto_pub -h localhost -p 1883 -t "test/topic" -m "merhaba"


3. Global yarn kurulumu
>> brew install yarn


