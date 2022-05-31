import express from 'express';
// eslint-disable-next-line import/extensions
import { register, login, updateUser } from '../controllers/authController.js';
// eslint-disable-next-line import/extensions
import authenticateUser from '../middleware/auth.js';
// eslint-disable-next-line import/extensions
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(authenticateUser, updateUser);

export default router;
