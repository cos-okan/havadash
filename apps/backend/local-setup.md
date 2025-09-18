Havadash Backend Lokal Kurulum Rehberi
1. Proje Klasör Yapısı
havadash/
│
├── apps/
│   └── backend/                # Express backend
│       ├── src/
│       ├── tests/
│       ├── package.json
│       └── .env.example
│
├── infra/
│   └── docker-compose.yml      # PostgreSQL, Redis, Mosquitto, Keycloak
│
├── packages/                   # Ortak kod/paketler
└── README.md

2. Docker Servislerini Başlatma

Docker Compose ile tüm third-party servisleri ayağa kaldır:

cd havadash/infra
docker-compose -p havadash up -d


Servisler ve Portlar
Servis	    Host	      Port
PostgreSQL	localhost	  5432
Redis	      localhost	  6379
Mosquitto	  localhost	  1883
Keycloak	  localhost	  8080

3. .env Dosyasını Oluşturma
cd ../apps/backend
cp .env.example .env

Örnek .env Dosyası
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=havadashdb
DB_USER=myuser
DB_PASSWORD=mypassword

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

MQTT_HOST=localhost
MQTT_PORT=1883
MQTT_USERNAME=
MQTT_PASSWORD=

KEYCLOAK_HOST=http://localhost:8080
KEYCLOAK_REALM=myrealm
KEYCLOAK_CLIENT_ID=myclient
KEYCLOAK_CLIENT_SECRET=mysecret
KEYCLOAK_ADMIN_USER=admin
KEYCLOAK_ADMIN_PASSWORD=admin

JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d


⚠️ .env dosyasını .gitignore ile repoya göndermeyin.

4. Backend Dependencies Yükleme
yarn install

package.json’daki tüm dependencies ve devDependencies yüklenir.

5. Knex Migration ve Seed Çalıştırma
yarn migrate   # DB tablolarını oluşturur
yarn seed      # Örnek data ekler (opsiyonel)

PostgreSQL container’ı çalışıyor olmalı.

6. Backend’i Başlatma
yarn dev

nodemon src/index.js ile backend başlar.

Kod değiştikçe otomatik restart olur.

Terminalde şunları görebilmelisin:

Server running on port 3000
Database connected successfully

7. API Test Etme

Postman veya tarayıcı ile:

http://localhost:3000/api/users
http://localhost:3000/api/auth/login


Redis veya MQTT loglarını görmek için:

docker logs redis
docker logs mosquitto

8. Docker Servislerini Durdurma
cd havadash/infra
docker-compose down

9. Öneriler

Production modda çalıştırmak için:

yarn start

.env dosyasındaki şifre ve secret bilgilerini güvenli saklayın.

Monorepo kullanıyorsanız root’tan Yarn workspace ile scriptleri çalıştırabilirsiniz:

yarn workspace myapp-backend dev
