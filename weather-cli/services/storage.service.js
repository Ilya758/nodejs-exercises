import os from 'os';
import path from 'path';
import {promises} from 'fs';
import dotenv from 'dotenv';

dotenv.config();
const {homedir} = os;
const filePath = path.join(homedir(), 'weather-data.json');

export const saveKeyVal = async (key, val) => {
  let data = {};

  if (await isExists(filePath)) {
    const file = await promises.readFile(filePath, 'utf8');
    data = JSON.parse(file);
  }

  data[key] = val;

  await promises.writeFile(filePath, JSON.stringify(data, null, 2));
};

export const getKey = async key => {
  if (await isExists(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);

    return data[key];
  }

  return undefined;
};

const isExists = async path => {
  try {
    await promises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};
