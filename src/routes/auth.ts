import { Router } from "express";
import { celebrate } from 'celebrate';
import { createUser, login } from '../controllers/users';
import  { ruleCreateUser, ruleLogin } from '../validators/users';

const router = Router();

router.post('/signin', celebrate(ruleLogin), login);
router.post('/signup', celebrate(ruleCreateUser), createUser);

export default router;
