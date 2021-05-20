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

export const deleteCredential = async (service: string): Promise<void> => {
  await getCredentialsCollection().deleteOne({ service: service });
};

export const readCredential = async (
  service: string
): Promise<CredentialType> => {
  const credential = await getCredentialsCollection().findOne({
    service: service,
  });
  if (!credential) {
    throw new Error('Cant find that');
  }
  return credential;
};
