import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import apiRouter from './routes/index.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { initializeDatabase } from './database/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', apiRouter);

app.use(errorHandler);

initializeDatabase();

app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] SommelIAr backend listening on port ${PORT}`);
});
