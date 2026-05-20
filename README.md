# Final Project Docker Deployment

## Deskripsi Project

Project ini merupakan implementasi multi-container application menggunakan Docker dan Docker Compose menggunakan Node.js dan MySQL.

Fitur aplikasi:

- CRUD User API
- Docker Compose
- Docker Volume
- Docker Network
- Environment Variable
- Multi-container architecture

---

# Struktur Project

```bash
project-app/
│
├── app/
│   ├── app.js
│   ├── db.js
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
│
├── docker-compose.yml
├── .env
└── README.md
```

---

# Menjalankan Project

Menjalankan project menggunakan Docker Compose:

```bash
docker compose up --build
```

Hasil:

- Backend container berhasil berjalan
- Database MySQL berhasil berjalan
- Backend berhasil terhubung dengan database

---

# 1. Pengujian Docker Compose, Volume, Network, dan Container

## Pengujian Docker Compose

Command:

```bash
docker compose up
```

Hasil:

Docker Compose berhasil menjalankan multi-container application tanpa error.

---

## Pengujian Container

Command:

```bash
docker ps
```

Hasil:

Container yang berjalan:

- user-service-app
- mysql-db

---

## Pengujian Docker Volume

Command:

```bash
docker volume ls
```

Hasil:

Docker Volume `mysql_data` berhasil dibuat dan digunakan untuk menyimpan data MySQL.

---

## Pengujian Docker Network

Command:

```bash
docker network ls
```

Hasil:

Docker Network berhasil dibuat dan container backend serta database dapat saling terhubung.

---

# 2. Pengujian Endpoint API

Base URL:

```text
http://localhost:3000
```

---

## GET /users

Request:

```http
GET /users
```

Response:

```json
[]
```

Hasil:

Endpoint GET berhasil menampilkan data user.

---

## POST /users

Request:

```http
POST /users
```

Body:

```json
{
  "name": "Eki",
  "email": "eki@gmail.com"
}
```

Response:

```json
{
  "message": "User created",
  "id": 1
}
```

Hasil:

Data user berhasil ditambahkan ke database.

---

## PUT /users/1

Request:

```http
PUT /users/1
```

Body:

```json
{
  "name": "Eki Update",
  "email": "ekiupdate@gmail.com"
}
```

Response:

```json
{
  "message": "User updated"
}
```

Hasil:

Data user berhasil diperbarui.

---

## DELETE /users/1

Request:

```http
DELETE /users/1
```

Response:

```json
{
  "message": "User deleted"
}
```

Hasil:

Data user berhasil dihapus dari database.

---

# 3. Pengujian Upload ke Docker Hub

## Login Docker Hub

```bash
docker login
```

---

## Build Docker Image

```bash
docker build -t username/user-service ./app
```

---

## Push Docker Image

```bash
docker push username/user-service
```

Hasil:

Docker image berhasil diupload ke Docker Hub.

---

# 4. Pengujian Tambahan

## Pengujian Environment Variable

Aplikasi berhasil menggunakan environment variable dari file `.env`.

Contoh:

```env
DB_HOST=db
DB_USER=root
DB_PASSWORD=root123
DB_NAME=userdb
DB_PORT=3306
PORT=3000
```

---

## Pengujian Multi-Container Architecture

Project terdiri dari:

- Backend container Node.js
- Database container MySQL

Kedua container berhasil berjalan secara terpisah dan saling terhubung menggunakan Docker Compose.

---

# Kesimpulan

Project CRUD User berhasil diimplementasikan menggunakan Node.js, MySQL, Docker, dan Docker Compose.

Aplikasi berhasil menerapkan:

- Multi-container architecture
- Docker Volume
- Docker Network
- Environment Variable
- CRUD REST API
- Docker Hub deployment

Seluruh service berhasil berjalan dengan baik menggunakan perintah:

```bash
docker compose up
```