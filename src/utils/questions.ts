import inquirer from 'inquirer';

export const askForMainPassword = async (): Promise<string> => {
  const answers = await inquirer.prompt<{ mainPassword: string }>([
    {
      type: 'password',
      name: 'mainPassword',
      message: 'Enter main password O_o',
    },
  ]);
  return answers.mainPassword;
};
