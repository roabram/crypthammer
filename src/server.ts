import { printPassword } from './utils/messages';
import {
  askForMainPassword,
  askForCommand,
  chooseService,
  askForCredential,
} from './utils/questions';
import { isMainPasswordValid } from './utils/validation';
import { readCredentials } from './utils/credentials';

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
        const credentials = await readCredentials();
        const credentialServices = credentials.map(
          (credential) => credential.service
        );
        const service = await chooseService(credentialServices);
        const selectedService = credentials.find(
          (credential) => credential.service === service
        );
        console.log(selectedService);
        printPassword(service);
      }
      break;
    case 'add':
      {
        const newCredential = await askForCredential();
        console.log(newCredential);
      }
      break;
  }
};
start();
