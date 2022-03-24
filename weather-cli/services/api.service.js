import axios from 'axios';
import {getKey} from './storage.service.js';

export const getWeather = async city => {
  const token = process.env.TOKEN ?? (await getKey('token'));

  if (!token) {
    throw new Error('Please, append your personal token by using flag -t');
  }

  return await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      lang: 'ru',
      units: 'metric',
    },
  });
};
