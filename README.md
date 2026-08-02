🎵 Musify – Java Full-Stack Music Platform
A modern, scalable full-stack music streaming platform built with Java Spring Boot, React.js, MongoDB, and Tailwind CSS. The application supports secure authentication, role-based access control, music streaming, playlist management, and cloud-based media storage using Cloudinary.

🌐 Live Demos
User App: https://musify-fullstack.vercel.app/
Admin Portal: https://musify-fullstack-1ogc.vercel.app/
Backend API: https://musifyapi-1a7f.onrender.com/
🚀 Features
🔐 JWT-based Authentication & Authorization
🎧 Music Streaming (audio hosted on Cloudinary)
👑 Admin Portal (dedicated app for Admins to upload and manage songs/albums)
📁 Playlist Management (create, update, delete playlists)
👤 User Management (register, login, RBAC)
☁️ Cloudinary Integration for audio & image storage
📱 Responsive UI built with Tailwind CSS
🔄 RESTful APIs with clean layered architecture
🛠️ Tech Stack
Backend
Java 17+
Spring Boot (REST APIs, Security)
Spring Security & JWT (JSON Web Token)
MongoDB (NoSQL Database)
Frontend
React.js (Vite)
Tailwind CSS
Axios
React Router
Lucide React (Icons)
Cloud & DevOps
Cloudinary (Media storage & CDN)
Vercel (Frontend Deployment)
Render (Backend Deployment)
Maven
Git & GitHub
🏗️ Architecture Overview
text

musify-app (User React App)  &  musify-admin (Admin React App)
                |                             |
                \--------- REST APIs ---------/
                          (JWT Secured)
                                |
                                v
                     musifyapi (Spring Boot)
                                |
                     /---------------------\
                     v                     v
                  MongoDB             Cloudinary 
                (Metadata)         (Audio & Images)
📂 Project Structure
text

musify-fullstack/
 ├── musifyapi/         # Java Spring Boot Backend
 ├── musify-app/        # React User Frontend
 └── musify-admin/      # React Admin Dashboard
🔐 Authentication Flow (JWT)
User logs in with credentials.
Backend validates the user and generates a JWT.
JWT is sent to the frontend.
Frontend stores the token securely in localStorage.
Token is sent in the Authorization: Bearer <token> header for protected APIs.
Admin endpoints restrict access strictly to accounts with the ADMIN role.
☁️ Cloudinary Integration
Audio files and album artwork are uploaded to Cloudinary via the Admin Portal.
Only the resulting secure URLs are stored in MongoDB.
Enables fast, global media delivery via CDN.
▶️ How to Run Locally
Prerequisites
Java 17+
Node.js & npm
MongoDB (Local or Atlas)
Cloudinary Account
Backend Setup
bash

cd musifyapi
./mvnw clean install
./mvnw spring-boot:run
Ensure you configure your .env or application.properties:

properties

spring.data.mongodb.uri=your_mongodb_uri
cloudinary.cloud-name=your_cloud_name
cloudinary.api-key=your_api_key
cloudinary.api-secret=your_api_secret
jwt.secret=your_jwt_secret
Frontend Setup (App & Admin)
Open two terminals:

Terminal 1: User App

bash

cd musify-app
npm install
npm run dev
Terminal 2: Admin Portal

bash

cd musify-admin
npm install
npm run dev
📌 API Endpoints (Sample)
Note: Song add, delete, and update operations are restricted to Admins.

Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
POST	/api/songs	Upload song (Admin)
GET	/api/songs	Get all songs
POST	/api/albums	Create album (Admin)
GET	/api/albums	Get all albums
🌱 Future Enhancements
🎼 Song recommendations algorithm
❤️ Like / favorite songs functionality
📊 User listening history
🎶 Audio waveform visualization
🐳 Dockerization
