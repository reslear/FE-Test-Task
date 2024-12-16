const crypto = require('crypto');
const http = require('http');

let token;
let tokenExpiry;

const weatherData = {
  USA: [
    'Sunny, 25°C', 'Cloudy, 20°C', 'Rainy, 22°C', 'Sunny, 24°C', 'Windy, 23°C', 'Sunny, 26°C', 'Cloudy, 21°C'
  ],
  Canada: [
    'Cloudy, 15°C', 'Rainy, 12°C', 'Sunny, 18°C', 'Cloudy, 14°C', 'Rainy, 10°C', 'Sunny, 20°C', 'Cloudy, 13°C'
  ],
  Germany: [
    'Rainy, 10°C', 'Cloudy, 8°C', 'Sunny, 12°C', 'Rainy, 9°C', 'Windy, 11°C', 'Sunny, 14°C', 'Cloudy, 10°C'
  ],
  Brazil: [
    'Hot, 30°C', 'Sunny, 32°C', 'Rainy, 28°C', 'Hot, 31°C', 'Sunny, 33°C', 'Cloudy, 29°C', 'Hot, 34°C'
  ],
  Australia: [
    'Windy, 20°C', 'Sunny, 22°C', 'Rainy, 18°C', 'Cloudy, 21°C', 'Windy, 19°C', 'Sunny, 23°C', 'Cloudy, 20°C'
  ],
};

http
.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/log-in') {
    let body = '';

    req
    .on('data', chunk => (body += chunk.toString()))
    .on('end', () => {
      try {
        const parsedBody = JSON.parse(body);

        const validCredentials = {
          email: 'example@email.com',
          password: 'example',
        };

        if (
          parsedBody.email === validCredentials.email &&
          parsedBody.password === validCredentials.password
        ) {
          // Генерация токена
          token = crypto.randomBytes(32).toString('hex');
          tokenExpiry = Date.now() + 15 * 60 * 1000; // Устанавливаем время жизни токена (15 минут)

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ token }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid email or password' }));
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON format' }));
      }
    });
  } else if (req.method === 'GET' && req.url.startsWith('/weather/')) {
    const country = req.url.split('/')[2];

    if (!token || Date.now() > tokenExpiry) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized: Token expired or not provided' }));
      return;
    }

    const authHeader = req.headers['authorization'];

    if (authHeader !== `Bearer ${token}`) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Forbidden: Invalid token' }));
      return;
    }

    if (weatherData[country]) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ country, weather: weatherData[country] }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Country not found' }));
    }
  } else if (req.method === 'GET' && req.url === '/cities') {
    if (!token || Date.now() > tokenExpiry) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized: Token expired or not provided' }));
      return;
    }

    const authHeader = req.headers['authorization'];

    if (authHeader !== `Bearer ${token}`) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Forbidden: Invalid token' }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ cities: Object.keys(weatherData) }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
})
.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
