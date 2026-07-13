import { Router } from 'express';
import ActivityModel from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await ActivityModel.find()
    .populate('user')
    .populate('team')
    .sort({ performedAt: -1 })
    .lean();

  res.status(200).json({
    resource: 'activities',
    items,
  });
});

export default router;
