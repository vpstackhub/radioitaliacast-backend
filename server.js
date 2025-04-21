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
    name: "Radio Italia",
    streamUrl: "https://radioitalia-live.akamaized.net/hls/live/2019651/RadioItalia/master.m3u8",
    region: "Cologno Monzese",
    logo: "https://cultura.biografieonline.it/wp-content/uploads/2012/11/Rismi.jpg"
  },
  {
    id: 3,
    name: "RTL 102.5",
    streamUrl: "https://streamingv2.shoutcast.com/rtl-1025",
    region: "Milano",
    logo: "https://th.bing.com/th/id/OIP.G9bScaxMOelIzA0geu940AHaHa?w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.5&pid=3.1&rm=2"
  },
  {
    id: 4,
    name: "Radio Kiss Kiss",
    streamUrl: "https://kisskiss80.streamingmedia.it:8000/",
    region: "Napoli",
    logo: "https://th.bing.com/th/id/OIP.KekJjU7kc2uXfUlXa_R9EwHaF3?w=280&h=222&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.5&pid=3.1&rm=2"
  },
  {
    id: 5,
    name: "Radio 105",
    streamUrl: "https://icecast.unitedradio.it/Radio105.mp3",
    region: "Milano",
    logo: "https://th.bing.com/th/id/OIP.dTcT_S2yRGBeGNnwEUA40gAAAA?w=245&h=254&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.5&pid=3.1&rm=2"
  },
  {
    id: 6,
    name: "RDS",
    streamUrl: "https://stream.rds.it/RDS128",
    region: "Roma",
    logo: "https://th.bing.com/th/id/OIP.tWAOM0YCyw3Ft40Kkzq5egHaET?w=327&h=190&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2"
  },
  {
    id: 7,
    name: "Virgin Radio Italia",
    streamUrl: "https://icy.unitedradio.it/Virgin.mp3",
    region: "Milano",
    logo: "https://th.bing.com/th/id/OIP.jdqCtSOPrjNr1bilpfnDzAHaHa?w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2"
  },
  {
    id: 8,
    name: "Radio Deejay",
    streamUrl: "https://radio.deejay.it/deejay.mp3",
    region: "Milano",
    logo: "https://th.bing.com/th/id/OIP.AwZHpM6IT_9_qPGec-NwggHaHa?w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2"
  },
  {
    id: 9,
    name: "Rai Isoradio",
    streamUrl: "https://icestreaming.rai.it/isoradio.mp3",
    region: "Italia",
    logo: "https://th.bing.com/th/id/OIP.T4TN-TTs4ZahGhFdr_gDaAHaFa?w=292&h=213&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2"
  },
  {
    id: 10,
    name: "Rai Radio 2",
    streamUrl: "https://icestreaming.rai.it/2.mp3",
    region: "Italia",
    logo: "https://th.bing.com/th/id/OIP.wWUOTMQP7M8mghzkEphzBgHaHa?w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2"
  },
  {
    id: 11,
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
