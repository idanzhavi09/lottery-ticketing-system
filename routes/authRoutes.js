// routes/authRoutes.js
import express from 'express';
const router = express.Router();
import authController from '../controllers/authController';

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);

module.exports = router;
