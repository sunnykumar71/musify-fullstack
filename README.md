# 🎵 Music Player –Java Full‑Stack Web Application

A modern, scalable **full‑stack music player web application** built with **Java Spring Boot**, **React.js**, **MongoDB**, and **Tailwind CSS**. The application supports secure authentication, music streaming, playlist management, and cloud‑based media storage using **Cloudinary**.
---

*************Image OF UI:*********************
## 🚀 Features

* 🔐 **JWT‑based Authentication & Authorization**
* 🎧 **Music Streaming** (audio hosted on Cloudinary)
* 📁 **Playlist Management** (create, update, delete playlists)
* 👤 **User Management** (register, login, roles)
* ☁️ **Cloudinary Integration** for audio & image storage
* 📱 **Responsive UI** built with Tailwind CSS
* 🔄 **RESTful APIs** with clean architecture

---

## 🛠️ Tech Stack

### Backend

* Java
* Spring Boot
* Spring Security
* JWT (JSON Web Token)
* MongoDB
* REST APIs

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router
* lucid-react
* 
### Cloud & Tools

* Cloudinary (media storage & CDN)
* Maven
* Git & GitHub

---

## 🏗️ Architecture Overview

```
Frontend (React + Tailwind)
        |
        |  REST APIs (JWT secured)
        v
Backend (Spring Boot)
        |
        v
MongoDB  ←→  Cloudinary (Audio & Images)
```

---

## 📂 Project Structure

### Backend (Spring Boot)

```
backend/
 ├── controller/
 ├── service/
 ├── repository/
 ├── model/
 ├── security/
 ├── config/
 └── MusicPlayerApplication.java
```

### Frontend (React)

```
frontend/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   ├── services/
 │   ├── context/
 │   └── App.jsx
 └── index.html
```

---

## 🔐 Authentication Flow (JWT)

1. User logs in with credentials
2. Backend validates user and generates JWT
3. JWT is sent to frontend
4. Frontend stores token securely
5. Token is sent in `Authorization` header for protected APIs

---

## ☁️ Cloudinary Integration

* Audio files and album artwork are uploaded to **Cloudinary**
* Only URLs are stored in MongoDB
* Enables fast media delivery via CDN

---

## ▶️ How to Run Locally

### Prerequisites

* Java 17+
* Node.js & npm
* MongoDB
* Cloudinary account

---

### Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Configure `application.properties`:

```
spring.data.mongodb.uri=your_mongodb_uri
cloudinary.cloud-name=your_cloud_name
cloudinary.api-key=your_api_key
cloudinary.api-secret=your_api_secret
jwt.secret=your_jwt_secret
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📌 API Endpoints (Sample)
* Song add, delete and post can  only Admin
  
| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| POST   | /api/auth/register | Register user   |
| POST   | /api/auth/login    | Login user      |
| POST   | /api/songs         | Upload song     |
| GET    | /api/songs         | Get all songs   |
| POST   | /api/playlists     | Create playlist |

---

## 📸 Screenshots
I will add.

---

## 🌱 Future Enhancements

* 🎼 Song recommendations
* ❤️ Like / favorite songs
* 📊 Listening history
* 🎶 Audio waveform visualization
* 🚀 Deployment (Docker / AWS)

---

