import fs from 'fs/promises';
import type { CredentialType } from '../types';
import AES from 'crypto-js/aes';

type DB = {
  credentials: CredentialType[];
};

export const readCredentials = async (): Promise<CredentialType[]> => {
  const response = await fs.readFile('./db.json', 'utf-8');
  const data: DB = JSON.parse(response);
  console.log(readCredentials);
  return data.credentials;
};

export const saveCredentials = async (
  newCredential: CredentialType
): Promise<void> => {
  const allCredentials = await readCredentials();
  allCredentials.push(newCredential);

  const encryptPassword = AES.encrypt(`${newCredential.password}`, 'secret123');

  console.log(encryptPassword.toString());
  newCredential.password = encryptPassword.toString();

  await fs.writeFile(
    './db.json',
    JSON.stringify({ credentials: allCredentials }, null, 2),
    'utf-8'
  );
};
