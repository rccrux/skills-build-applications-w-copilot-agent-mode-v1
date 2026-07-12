import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import './config/database';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'octofit-backend',
    port,
  });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});
