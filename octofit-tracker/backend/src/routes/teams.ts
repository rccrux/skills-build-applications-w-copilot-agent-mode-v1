import { Router } from 'express';
import TeamModel from '../models/team';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await TeamModel.find().lean();
  res.status(200).json({
    resource: 'teams',
    items,
  });
});

export default router;
