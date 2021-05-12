import { printPassword } from './utils/messages';
import {
  askForMainPassword,
  askForCommand,
  chooseService,
  addNewService,
  addNewUserAndPassword,
} from './utils/questions';
import {
  isMainPasswordValid,
  doesCredentialServiceExist,
} from './utils/validation';
//function start() {
const start = async () => {
  const mainPassword = await askForMainPassword();
  if (!(await isMainPasswordValid(mainPassword))) {
    console.log('Is invalid');
    start();
    return;
  }
  console.log('Is valid');

  const command = await askForCommand();
  switch (command) {
    case 'list':
      {
        const service = await chooseService();
        printPassword(service);
      }
      break;
    case 'add':
      {
        const startAddCase = async () => {
          const newService = await addNewService();
          if (!doesCredentialServiceExist(newService)) {
            await addNewUserAndPassword();
            console.log('Your new service has been saved');
          } else {
            console.log('Service already exists');
            startAddCase();
          }
        };
        startAddCase();
      }
      break;
  }
};
start();
