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
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4f/RaiRadio1-logo.png"
  },
  {
    id: 2,
    name: "Radio Italia",
    streamUrl: "https://stream.rds.it/rds.it.mp3", // <-- we may need to fix this
    region: "Cologno Monzese",
    logo: "https://www.radioitalia.it/apple-touch-icon.png"
  },
  {
    id: 3,
    name: "RTL 102.5",
    streamUrl: "https://streamingv2.shoutcast.com/rtl-1025",
    region: "Milano",
    logo: "https://www.rtl.it/static/logos/rtl_logo_512.png"
  },
  {
    id: 4,
    name: "Radio Kiss Kiss",
    streamUrl: "https://ice02.fluidstream.net/KissKiss.mp3",
    region: "Napoli",
    logo: "https://www.kisskiss.it/wp-content/uploads/2021/11/favicon.png"
  },
  {
    id: 5,
    name: "Radio 105",
    streamUrl: "https://icecast.unitedradio.it/Radio105.mp3",
    region: "Milano",
    logo: "https://play-lh.googleusercontent.com/9GivbqaOEjjKqNT99bQ6gJbhD5BA7QEvLknL9oTOq38Zub_KaEkfDAp9Wo3LoJvM7YY"
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
