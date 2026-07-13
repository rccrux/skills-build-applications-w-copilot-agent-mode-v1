import { Router } from 'express';
import UserModel from '../models/user';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await UserModel.find().populate('team').lean();
  res.status(200).json({
    resource: 'users',
    items,
  });
});

export default router;
