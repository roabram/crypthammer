import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDatabase } from './utils/database';
import { readCredentials, saveCredentials } from './utils/credentials';

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

app.post('/api/credentials', (request, response) => {
  // response.send('Add new credential');
  response.json(request.body);
  saveCredentials(request.body);
});

connectDatabase(process.env.MONGO_URL).then(() => {
  console.log('Database connected');
  app.listen(port, () => {
    console.log(`Crypthammer listening at http://localhost:${port}`);
  });
});
