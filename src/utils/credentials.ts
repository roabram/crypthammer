import type { CredentialType } from '../types';
import AES from 'crypto-js/aes';
import { getCredentialsCollection } from './database';

export const readCredentials = async (): Promise<CredentialType[]> => {
  return await getCredentialsCollection().find().sort({ service: 1 }).toArray();
};

export const saveCredentials = async (
  newCredential: CredentialType
): Promise<void> => {
  const encryptPassword = AES.encrypt(newCredential.password, 'secret123');
  newCredential.password = encryptPassword.toString();

  await getCredentialsCollection().insertOne(newCredential);
};

export const deleteCredential = async (
  service: CredentialType
): Promise<void> => {
  await getCredentialsCollection().deleteOne(service);
};
