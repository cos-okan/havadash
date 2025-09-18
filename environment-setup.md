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
Databases → myappdb → Schemas → public → Tables altında tabloları görebilirsin

3. Global yarn kurulumu
>> brew install yarn


