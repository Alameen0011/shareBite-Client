# 🍱 ShareBite – Real-Time Food Sharing Platform

**ShareBite** is a full-stack web application that connects food donors with nearby volunteers and kiosks to reduce food waste and support those in need. The platform leverages real-time communication and geolocation technologies to enable seamless donation claiming, tracking, and coordination.

---

## 🚀 Features

- 👤 **Role-Based Access**: Donor, Volunteer, Admin
- 📍 **Live Map Tracking**: Real-time location sharing and route guidance for volunteers using leaflet.js
- ⚡ **Socket.IO Integration**: Instant donation claiming and notifications
- 🛡 **Authentication**: Secure login with JWT tokens
- 🧑‍💻 **Admin Dashboard**:
  - User Management (search, filter, block)
  - Kiosk Management
  - Messaging and Video Call support for issue resolution
- 🎒 **Volunteer Interface**:
  - Claim donations nearby
  - Receive live updates and directions to delivery kiosks
- 🍽 **Donor Interface**:
  - Post food donations easily
  - Track status of donations

---

## 🛠 Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS + ShadCN/UI
- Redux Toolkit + React Query
- Leaflet.js / React Leaflet
- Zego Cloud
- Socket.IO Client

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Auth + Role Middleware
- Socket.IO Server
- REST APIs

---

