// Rutas de autenticación: registro y login

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../validators/authValidator');


// POST /api/auth/register
router.post('/register', validateRegister, authController.register);


// POST /api/auth/login
router.post('/login', validateLogin, authController.login);


module.exports = router;