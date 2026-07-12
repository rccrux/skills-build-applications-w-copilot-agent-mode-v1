import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import './config/database';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';
import { getApiBaseUrl } from './config/baseUrl';

dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'octofit-backend',
    port,
    baseUrl: getApiBaseUrl(),
  });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});
