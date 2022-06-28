import express from 'express';

import rateLimiter from 'express-rate-limit';
// eslint-disable-next-line import/extensions
import { register, login, updateUser } from '../controllers/authController.js';
// eslint-disable-next-line import/extensions
import authenticateUser from '../middleware/auth.js';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 100 requests per windowMs
  message: 'Too many accounts created from this IP, please try again after 15 minutes',
});
// eslint-disable-next-line import/extensions
const router = express.Router();

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/updateUser').patch(authenticateUser, updateUser);

export default router;
