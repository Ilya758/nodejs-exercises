import chalk from 'chalk';

export const printError = err => console.log(chalk.bgRed(`Error: ${err}`));
export const printSuccess = message =>
  console.log(chalk.bgGreen(`SUCCESS: ${message}`));
export const printHelp = () =>
  console.log(
    'HELP!\nFlags:\n-h: print help\n-s: save your city\n-t: save your token\nHave a nice day!',
  );
