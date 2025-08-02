// server.js
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 5000;

const apiKey = process.env.OPENWEATHER_API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function fetchWeather(city) {
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
  if (!response.ok) throw new Error('Failed to fetch weather');
  return await response.json();
}

app.get('/api', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const data = await fetchWeather(city);
    res.json(data);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});