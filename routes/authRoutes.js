import express from 'express';
const router = express.Router();
import {register, login, updateUser} from '../controllers/authController.js';
import authienticateUser from '../middleware/auth.js';
import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'To many request from this IP adress. Please try again after 15 minutes.'
});

router.post('/register',apiLimiter, register);
router.post('/login',apiLimiter, login);
router.patch('/updateUser', authienticateUser, updateUser);

export default router;