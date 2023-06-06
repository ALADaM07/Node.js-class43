import express from 'express';
import { weatherKey } from './sources/keys.js';
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
    const errCode = data.cod;
    if (cityNameData.includes(cityName.toLowerCase())) {
      res.send({
        weatherText: `City: ${cityName.charAt(0).toUpperCase()}${cityName.slice(
          1
        )}, Temp: ${temperature}`,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(404).send({ weatherText: 'City is not found!' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
