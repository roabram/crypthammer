import fs from 'fs/promises';
import sha256 from 'crypto-js/sha256';
import { readCredentials } from './credentials';
import type { CredentialType } from '../types';

export const isMainPasswordValid = async (
  plaintextPassword: string
): Promise<boolean> => {
  const passwordHash = await fs.readFile('./.password', 'utf-8');
  const plaintextPasswordHash = sha256(plaintextPassword).toString();
  return plaintextPasswordHash === passwordHash;
};

export const isServiceCredentialInDB = async (
  newCredential: CredentialType
): Promise<boolean> => {
  const existingCredentials = await readCredentials();
  const existsInDb = existingCredentials.some(
    (credential) =>
      credential.service.toLowerCase() ===
        newCredential.service.toLowerCase() &&
      credential.username.toLowerCase() === newCredential.username.toLowerCase()
  );
  return existsInDb;
};
