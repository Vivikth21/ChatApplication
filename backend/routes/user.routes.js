import express from 'express';
import authenticateJwt from '../middleware/webToken.js';
import { getAllUsers } from '../controllers/user.controller.js';
import { validateMe } from '../controllers/me.controller.js';

const router = express.Router();

router.get('/',authenticateJwt,getAllUsers);
router.get('/me',authenticateJwt,validateMe);

export default router;