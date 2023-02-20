import { RequestHandler, Router } from "express";
import { celebrate } from 'celebrate';
import {
  getCurrentUser,
  updateUser,
} from '../controllers/users';
import { ruleUpdateUser } from '../validators/users';

const router = Router();

router.get('/me', (getCurrentUser as RequestHandler));
router.patch('/me', celebrate(ruleUpdateUser), (updateUser as RequestHandler));

export default router;
