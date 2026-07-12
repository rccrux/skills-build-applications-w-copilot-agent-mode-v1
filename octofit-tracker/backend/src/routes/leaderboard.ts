import { Router } from 'express';
import LeaderboardModel from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await LeaderboardModel.find()
    .populate('entries.user')
    .populate('entries.team')
    .sort({ generatedAt: -1 })
    .lean();

  res.status(200).json({
    resource: 'leaderboard',
    items,
  });
});

export default router;
