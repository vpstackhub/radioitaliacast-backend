const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const stations = [
  {
    id: 1,
    name: "Rai Radio 1",
    streamUrl: "https://icestreaming.rai.it/1.mp3",
    region: "Roma",
    logo: "https://th.bing.com/th/id/OIP.wfIFmhn35RYXjeLq499otgHaCi?w=350"
  },
  {
  id: 2,
  name: "Radio Monte Carlo",
  streamUrl: "http://edge.radiomontecarlo.net/RMC.mp3",
  region: "Italia",
  logo: "assets/images/rmc.png" 
  },
  {
    id: 3,
    name: "Radio Kiss Kiss",
    streamUrl: "http://ice07.fluidstream.net:8080/KissKiss.mp3",
    region: "Napoli",
    logo: "https://th.bing.com/th/id/OIP.KekJjU7kc2uXfUlXa_R9EwHaF3?w=280&h=222&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.5&pid=3.1&rm=2"
  },
  {
    id: 4,
    name: "Radio 105",
    streamUrl: "https://icy.unitedradio.it/Radio105.mp3",
    region: "Milano",
    logo: "https://th.bing.com/th/id/OIP.dTcT_S2yRGBeGNnwEUA40gAAAA?w=245&h=254&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.5&pid=3.1&rm=2"
  },
  {
    id: 5,
    name: "RDS Solo Grandi Successi",
    streamUrl: "https://stream.rds.radio/audio/rds.stream_aac64/playlist.m3u8",
    region: "HLS Test",
    logo: "https://th.bing.com/th/id/OIP.tWAOM0YCyw3Ft40Kkzq5egHaET?w=327&h=190&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2"
  },
  {
    id: 6,
    name: "Virgin Radio Italia",
    streamUrl: "https://icy.unitedradio.it/Virgin.mp3",
    region: "Milano",
    logo: "assets/images/virginradio.png"
  },
  {
  id: 7,
  name: "Radio Italia Anni 60",
  streamUrl: " http://str01.fluidstream.net:7130/",
  region: "Italia",
  logo: "assets/images/ria60.png"
},
  {
    id: 8,
    name: "Rai Isoradio",
    streamUrl: "http://icestreaming.rai.it/7.mp3",
    region: "Italia",
    logo: "https://th.bing.com/th/id/OIP.T4TN-TTs4ZahGhFdr_gDaAHaFa?w=292&h=213&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2"
  },
  {
    id: 9,
    name: "Rai Radio 2",
    streamUrl: "https://icestreaming.rai.it/2.mp3",
    region: "Italia",
    logo: "https://th.bing.com/th/id/OIP.wWUOTMQP7M8mghzkEphzBgHaHa?w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2"
  },
  {
    id: 10,
    name: "Radio Subasio",
    streamUrl: "https://icy.unitedradio.it/Subasio.mp3",
    region: "Assisi",
    logo: "https://th.bing.com/th/id/OIP.ztT0sBJla_PW90Nc3JYJZwHaHa?w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2"
  }
];

app.get('/', (req, res) => {
  res.send('🎧 Welcome to RadioItaliaCast Backend!');
});


app.get('/api/stations', (req, res) => {
  res.json(stations);
});

app.listen(PORT, () => {
  console.log(`🎧 RadioItaliaCast backend running at http://localhost:${PORT}`);
});
