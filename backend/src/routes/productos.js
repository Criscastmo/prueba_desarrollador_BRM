// src/routes/productos.js
const express = require('express');
const router = express.Router();

const productoController = require('../controllers/productoController');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
const { crearProductoSchema, actualizarProductoSchema } = require('../validators/productoValidators');
const { validateSchema } = require('../middlewares/validate');

// Rutas públicas
router.get('/', productoController.listarProductos);
router.get('/:id', productoController.obtenerProducto);

// Rutas protegidas (solo admin)
router.post(
  '/',
  verifyToken,
  checkRole('admin'),
  validateSchema(crearProductoSchema),
  productoController.crearProducto
);

router.put(
  '/:id',
  verifyToken,
  checkRole('admin'),
  validateSchema(actualizarProductoSchema),
  productoController.actualizarProducto
);

router.delete(
  '/:id',
  verifyToken,
  checkRole('admin'),
  productoController.eliminarProducto
);

module.exports = router;
