// server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const https = require('https');
const { parse, resolve: resolveUrl } = require('url');

const app = express();
const PORT = process.env.PORT || 3000;

// Prefer IPv4 + keep-alive for radio/CDN hosts
const httpAgent  = new http.Agent({  keepAlive: true, family: 4 });
const httpsAgent = new https.Agent({ keepAlive: true, family: 4 });

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

// --- Stations ---
const stations = [
  { id: 1,  name: "Rai Radio 1",         streamUrl: "https://icestreaming.rai.it/1.mp3",                                region: "Roma",   logo: "https://th.bing.com/th/id/OIP.wfIFmhn35RYXjeLq499otgHaCi?w=350" },
  { id: 2, name: "Radio Monte Carlo",    streamUrl: "https://icy.unitedradio.it/RMC.mp3",                               region: "Italia", logo: "assets/images/rmc.png" },
  { id: 3,  name: "Radio Kiss Kiss",     streamUrl: "http://ice07.fluidstream.net:8080/KissKiss.mp3",                   region: "Napoli", logo: "https://th.bing.com/th/id/OIP.KekJjU7kc2uXfUlXa_R9EwHaF3?w=280&h=222&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.5&pid=3.1&rm=2" },
  { id: 4,  name: "Radio 105",           streamUrl: "https://icy.unitedradio.it/Radio105.mp3",                          region: "Milano", logo: "https://th.bing.com/th/id/OIP.dTcT_S2yRGBeGNnwEUA40gAAAA?w=245&h=254&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2" },
  { id: 5,  name: "RDS Solo Grandi",     streamUrl: "https://stream.rds.radio/audio/rds.stream_aac64/playlist.m3u8",    region: "HLS Test", logo: "https://th.bing.com/th/id/OIP.tWAOM0YCyw3Ft40Kkzq5egHaET?w=327&h=190&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2" },
  { id: 6,  name: "Virgin Radio Italia", streamUrl: "https://icy.unitedradio.it/Virgin.mp3",                            region: "Milano", logo: "assets/images/virginradio.png" },
  { id: 7,  name: "Radio Italia Anni 60",streamUrl: "http://str01.fluidstream.net:7130/",                               region: "Italia", logo: "assets/images/ria60.png" },
  { id: 8,  name: "Rai Isoradio",        streamUrl: "http://icestreaming.rai.it/7.mp3",                                 region: "Italia", logo: "https://th.bing.com/th/id/OIP.T4TN-TTs4ZahGhFdr_gDaAHaFa?w=292&h=213&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2" },
  { id: 9,  name: "Rai Radio 2",         streamUrl: "https://icestreaming.rai.it/2.mp3",                                region: "Italia", logo: "https://th.bing.com/th/id/OIP.wWUOTMQP7M8mghzkEphzBgHaHa?w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2" },
  { id: 10, name: "Radio Subasio",       streamUrl: "https://icy.unitedradio.it/Subasio.mp3",                           region: "Assisi", logo: "https://th.bing.com/th/id/OIP.ztT0sBJla_PW90Nc3JYJZwHaHa?w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2" }
];

// Friendly root
app.get('/', (req, res) => res.send('🎧 RadioItaliaCast backend is running.'));

// Health & stations
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime(), ts: Date.now() });
});
app.get('/stations', (req, res) => {
  res.json(stations);
});

// --- Core streaming proxy (http+https, redirects, range, timeouts) ---
function proxyStream(req, res, target, depth = 0) {
  if (!target) return res.status(400).send('Missing stream URL. Use /proxy?url=...');
  if (depth > 5) return res.status(508).send('Too many redirects');

  const u = parse(target);
  const isHttps = u.protocol === 'https:';
  const client = isHttps ? https : http;
  const agent  = isHttps ? httpsAgent : httpAgent;

  const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Accept': 'audio/mpeg, audio/aac, application/octet-stream, */*',
  'Accept-Language': 'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7',
  'Origin': 'https://www.raiplayradio.it',
  'Referer': 'https://www.raiplayradio.it/',
  'Host': u.host,
  'Connection': 'keep-alive'
};

  if (req.headers.range) headers['Range'] = req.headers.range;

  const options = {
    protocol: u.protocol,
    hostname: u.hostname,
    port: u.port,
    path: u.path || '/',
    method: 'GET',
    agent,
    headers,
    timeout: 15000,
  };

  const upstream = client.request(options, (upRes) => {
    // Follow redirects
    if (upRes.statusCode >= 300 && upRes.statusCode < 400 && upRes.headers.location) {
      const next = upRes.headers.location.startsWith('http')
        ? upRes.headers.location
        : resolveUrl(target, upRes.headers.location);
      upRes.resume(); // drain current response
      return proxyStream(req, res, next, depth + 1);
    }

    res.status(upRes.statusCode || 200);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');
    if (upRes.headers['accept-ranges'])  res.setHeader('Accept-Ranges', upRes.headers['accept-ranges']);
    if (upRes.headers['content-length']) res.setHeader('Content-Length', upRes.headers['content-length']);
    res.setHeader('Content-Type', upRes.headers['content-type'] || 'audio/mpeg');

    // Flush headers before streaming body (helps some players)
    if (typeof res.flushHeaders === 'function') res.flushHeaders();

    // Stream audio to client
    upRes.pipe(res);

    // If client disconnects, stop upstream
    res.on('close', () => { try { upstream.destroy(); } catch {} });
  });

  upstream.on('timeout', () => upstream.destroy(new Error('Upstream timeout')));
  upstream.on('error', (err) => {
    console.error('🔴 Proxy error:', err.message, '->', target);
    // One retry for plain HTTP with Connection: close (old Icecast quirk)
    if (!isHttps && depth === 0) {
      try { upstream.destroy(); } catch {}
      options.headers['Connection'] = 'close';
      return proxyStream(req, res, target, depth + 1);
    }
    if (!res.headersSent) res.status(502).send('Proxy failed: ' + err.message);
  });

  // If browser aborts, cancel upstream too
  req.on('close', () => { try { upstream.destroy(); } catch {} });

  upstream.end();
}

app.get('/proxy', (req, res) => proxyStream(req, res, req.query.url));

app.listen(PORT, () => {
  console.log(`🎧 RadioItaliaCast backend running at http://localhost:${PORT}`);
});
