import { config } from 'dotenv';
config();

import express from 'express';
import assistantController from './infrastructure/controllers/AssistantController';

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/assistant', assistantController);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}...`);
});
