// Rutas de autenticación: registro y login

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../validators/authValidator');

/**
 * @api {post} /auth/register Registrar usuario
 * @apiName Register
 * @apiGroup Auth
 * 
 * @apiBody {String} nombre Nombre del usuario
 * @apiBody {String} email Email del usuario
 * @apiBody {String} documento numero de identificación
 * @apiBody {String} telefono Teléfono del usuario
 * @apiBody {String} direccion Dirección del usuario
 * @apiBody {String} password Contraseña
 * 
 * @apiSuccess {Object} user Datos del usuario registrado
 * 
 * @apiError {String} error Mensaje de error
 */
// POST /api/auth/register
router.post('/register', validateRegister, authController.register);


/**
 * @api {post} /auth/login Login usuario
 * @apiName Login
 * @apiGroup Auth
 * 
 * @apiBody {String} email Email
 * @apiBody {String} password Contraseña
 * 
 * @apiSuccess {Object} user Usuario logueado
 * @apiSuccess {String} token Token para usar en otras rutas
 * 
 * @apiError {String} error Error de login
 */
// POST /api/auth/login
router.post('/login', validateLogin, authController.login);


module.exports = router;