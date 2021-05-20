import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDatabase } from './utils/database';
import {
  deleteCredential,
  readCredentials,
  saveCredentials,
} from './utils/credentials';

if (process.env.MONGO_URL === undefined) {
  throw new Error('Missing env MONGO_URL');
}

const app = express();
const port = 3333;

app.use(express.json());

app.get('/api/credentials', async (_request, response) => {
  const credentials = await readCredentials();
  response.json(credentials);
});

app.post('/api/credentials', async (request, response) => {
  // response.send('Add new credential');
  await saveCredentials(request.body);
  response.json(request.body);
});

app.delete('/api/credentials/:service', async (request, response) => {
  console.log(request.params.service);
  await deleteCredential(request.params.service);
  response.send('Delete credential');
});

connectDatabase(process.env.MONGO_URL).then(() => {
  console.log('Database connected');
  app.listen(port, () => {
    console.log(`Crypthammer listening at http://localhost:${port}`);
  });
});
