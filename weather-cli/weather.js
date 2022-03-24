import getArgs from './helpers/helpers.js';
import {getWeather} from './services/api.service.js';
import {printError, printHelp, printSuccess} from './services/log.services.js';
import {getKey, saveKeyVal} from './services/storage.service.js';

const saveData = async (param, data) => {
  if (!data.length) {
    printError('Cannot get data! May we ask you to provide a valid info?');
    return false;
  }

  const p = param === 'city' ? 'city' : 'token';

  try {
    await saveKeyVal(p, data);
    printSuccess(`${p} was saved`);
  } catch (e) {
    printError("There's smth went wrong!");
  }
};

const getForecast = async () => {
  try {
    const city = (await getKey('city')) || 'minsk';
    const weatherData = await getWeather(city);
    const {
      data: {
        wind,
        main: {temp},
        name,
      },
    } = weatherData;

    console.log(
      `Ваш город: ${name}\nВетер: ${wind.speed} м/с\nТемпература: ${temp} ℃\nЖелаем Вам хорошего дня!`,
    );
  } catch (e) {
    if (e.response) {
      switch (e.response.status) {
        case 404: {
          console.log('Correct the city, please!');
          break;
        }

        case 401: {
          console.log('Your token is expired or broken!');
          break;
        }

        default: {
          console.log("We don't know ¯_(ツ)_/¯");
          break;
        }
      }
    } else {
      console.log("Here is a critical bug!!! We're trying to fix it!");
    }
  }
};

const init = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
    return;
  }

  if (args.s) {
    return saveData('city', args.s);
  }

  if (args.t) {
    return saveData('token', args.t);
  }

  getForecast();
};

init();
