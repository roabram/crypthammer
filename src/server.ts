import dotenv from 'dotenv';
import {
  askForMainPassword,
  askForCommand,
  chooseService,
  askForCredential,
} from './utils/questions';
import {
  isMainPasswordValid,
  isServiceCredentialInDB,
} from './utils/validation';
import { readCredentials, saveCredentials } from './utils/credentials';
import CryptoJS from 'crypto-js';
import { connectDatabase } from './utils/database';

dotenv.config();
//function start() {

const start = async () => {
  if (process.env.MONGO_URL === undefined) {
    throw new Error('Missing env MONGO_URL');
  }

  await connectDatabase(process.env.MONGO_URL);

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
        if (selectedService) {
          const decryptedPassword = CryptoJS.AES.decrypt(
            selectedService.password,
            'secret123'
          );
          console.log(decryptedPassword.toString(CryptoJS.enc.Utf8));
        }

        // printPassword(service);
      }
      break;
    case 'add':
      {
        const newCredential = await askForCredential();
        const existsInDb = await isServiceCredentialInDB(newCredential);
        if (existsInDb) {
          console.log('Credential already exists.');
          break;
        }
        await saveCredentials(newCredential);
        console.log(
          `Service: ${newCredential.service} with Username: ${newCredential.username} is saved in database`
        );
      }
      break;
  }
};
start();
