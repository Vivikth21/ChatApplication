import express from 'express';
import { sendMessage } from '../controllers/message.controller.js';
import authenticateJwt from '../middleware/webToken.js';
import { getMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/:id',authenticateJwt,getMessage);
router.post('/send/:id',authenticateJwt,sendMessage);

export default router;