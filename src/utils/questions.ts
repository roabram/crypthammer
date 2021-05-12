import inquirer from 'inquirer';
import { Command } from '../types';
//export function askForMainPassword(): Promise<string> {
export const askForMainPassword = (): Promise<string> => {
  return inquirer
    .prompt<{ mainPassword: string }>([
      {
        type: 'password',
        name: 'mainPassword',
        message: 'Enter main password',
        mask: '*',
      },
    ])
    .then((answers) => answers.mainPassword);
};
export const askForCommand = async (): Promise<Command> => {
  const answers = await inquirer.prompt<{ command: Command }>([
    {
      type: 'list',
      name: 'command',
      message: 'What would you like to do?',
      choices: [
        { name: 'List all credentials', value: 'list' },
        { name: 'Add new credentials', value: 'add' },
      ],
    },
  ]);
  return answers.command;
};
export const chooseService = async (services: string[]): Promise<string> => {
  const answers = await inquirer.prompt<{ service: string }>({
    type: 'list',
    name: 'service',
    message: 'Please choose a service',
    choices: services,
  });

  return answers.service;
};

export const askForCredential = async (): Promise<Credential> => {
  const answers = await inquirer.prompt<Credential>([
    {
      type: 'input',
      name: 'service',
      message: 'Please enter service name',
    },
    {
      type: 'input',
      name: 'username',
      message: 'Please enter username',
    },
    { type: 'password', name: 'password', message: 'Please enter password' },
  ]);
  return answers;
};
