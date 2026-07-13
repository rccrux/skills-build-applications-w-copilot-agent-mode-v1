import { Router } from 'express';
import WorkoutModel from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await WorkoutModel.find().populate('createdBy').lean();
  res.status(200).json({
    resource: 'workouts',
    items,
  });
});

export default router;
