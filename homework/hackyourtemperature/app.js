import express from 'express';
import { weatherAPIConfig } from './sources/keys.js';
const apiKey = weatherKey.API_KEY;
import fetch from 'node-fetch';

const app = express();
app.use(express.json());
app.get('/', (req, res) => res.send('Hello from backend to frontend!'));

app.post('/weather', async (req, res) => {
  try {
    const cityName = req.body.cityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const temperature = data.main.temp;
    const cityNameData = data.name.toLowerCase().split(' ');
    if (cityNameData.includes(cityName.toLowerCase())) {
      res.send({
        weatherText: `City: ${cityName.charAt(0).toUpperCase()}${cityName.slice(
          1
        )}, Temp: ${temperature}`,
      });
      return;
    }
  } catch (err) {
    if (err.statusCode === 404) {
      console.log(err.message);
      res.status(404).send({ weatherText: 'City is not found!' });
    } else {
      console.log(err.message);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
});

export default app;
