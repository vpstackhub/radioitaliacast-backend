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
    streamUrl: "https://stream.rds.it/rds.it.mp3", 
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
    streamUrl: "https://ice02.fluidstream.net/KissKiss.mp3",
    region: "Napoli",
    logo: "https://th.bing.com/th/id/OIP.KekJjU7kc2uXfUlXa_R9EwHaF3?w=280&h=222&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.5&pid=3.1&rm=2"
  },
  {
    id: 5,
    name: "Radio 105",
    streamUrl: "https://icecast.unitedradio.it/Radio105.mp3",
    region: "Milano",
    logo: "https://th.bing.com/th/id/OIP.dTcT_S2yRGBeGNnwEUA40gAAAA?w=245&h=254&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.5&pid=3.1&rm=2"
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
