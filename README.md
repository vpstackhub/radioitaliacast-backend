# 🎧 RadioItaliaCast Backend

Welcome to the backend of **RadioItaliaCast** — a Node.js + Express API that delivers curated Italian radio stations to your ears, no matter where you are. This server provides station data and serves as the audio hub for the frontend Angular app.

---

## 🚀 Features

- 🌍 Exposes an API endpoint to serve a list of Italian radio stations  
- 🎙️ Includes metadata: stream URLs, station names, regions, logos  
- 🔗 CORS-enabled for frontend integration  
- 🧩 Lightweight, fast, and simple by design

---

## 📁 Project Structure

```bash
radioitaliacast-backend/
├── server.js                 # Main server file
├── package.json             # Project dependencies and metadata
├── .gitignore               # Files and folders to ignore in Git
├── Dockerfile               # Docker config for backend containerization
└── README.md                # You're reading it!
```

---

## ⚙️ API Endpoint

### `GET /api/stations`

Returns a JSON array of all available radio stations.

**Example response**:

```json
[
  {
    "id": 1,
    "name": "Rai Radio 1",
    "streamUrl": "https://icestreaming.rai.it/1.mp3",
    "region": "Roma",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/4/4f/RaiRadio1-logo.png"
  },
  ...
]
```

---

## 🖥️ Run Locally

Install dependencies and start the server:

```bash
npm install
node server.js
```

Visit: [http://localhost:3000/api/stations](http://localhost:3000/api/stations)

---

## 🐳 Docker Support

This backend is ready for containerized deployment via Docker and Docker Compose.

### Dockerfile Highlights

- Base image: `node:18-alpine`
- Exposes port `3000`
- Runs `server.js`

### Build & Run

```bash
docker build -t radioitaliacast-backend .
docker run -d -p 3000:3000 radioitaliacast-backend
```

---

## 📦 Docker Compose Integration

When used with the frontend, you can spin up both services together:

```bash
docker-compose up -d
```

---

## 🔧 Future Enhancements

- ✅ Validation for station data
- ✅ Separate config file for stations
- 🔐 Secure CORS origin to specific frontend domain
- 🗃️ Database integration (MongoDB or Firebase)
- 🛡️ Authentication for protected routes

---

## 👨‍💻 Author

**Valerio Porcelli**  
GitHub: [@vpstackhub](https://github.com/vpstackhub)  

🎯 _This backend powers the RadioItaliaCast app — proudly developed and deployed as part of my Full Stack Developer journey._

---
