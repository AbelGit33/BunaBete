const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');

router.post('/register', [
  body('username').isLength({ min: 3, max: 30 }).trim(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('fullName').optional().trim(),
  body('phone').optional().trim(),
  body('referralCode').optional().trim()
], authController.register);

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], authController.login);

router.post('/logout', authController.logout);

router.post('/refresh', authController.refreshToken);

router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail()
], authController.forgotPassword);

router.post('/reset-password', [
  body('token').notEmpty(),
  body('password').isLength({ min: 6 })
], authController.resetPassword);

router.get('/verify/:token', authController.verifyEmail);

module.exports = router;
