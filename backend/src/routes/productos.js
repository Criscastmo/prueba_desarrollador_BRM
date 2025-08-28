// src/routes/productos.js
const express = require('express');
const router = express.Router();

const productoController = require('../controllers/productoController');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
const { crearProductoSchema, actualizarProductoSchema } = require('../validators/productoValidators');
const { validateSchema } = require('../middlewares/validate');

/** 
 * Rutas públicas
 * /
/**
 * @api {get} /productos/ Listar productos
 * @apiName ListarProductos
 * @apiGroup Productos
 * 
 * @apiSuccess {Array} productos Lista de todos los productos
 * 
 * @apiError {String} error Mensaje de error
 */
router.get('/', productoController.listarProductos);

/**
 * @api {get} /productos/:id Obtener producto
 * @apiName ObtenerProducto
 * @apiGroup Productos
 * 
 * @apiParam {Number} id ID del producto
 * 
 * @apiSuccess {Object} producto Datos del producto
 * 
 * @apiError {String} error Mensaje de error
 */
router.get('/:id', productoController.obtenerProducto);

/** 
 * Rutas protegidas (solo admin)
 */
/**
 * @api {post} /productos/ Crear producto
 * @apiName CrearProducto
 * @apiGroup Productos
 * 
 * @apiBody {String} numero_lote Número de lote del producto
 * @apiBody {String} nombre Nombre del producto
 * @apiBody {Number} precio Precio del producto
 * @apiBody {Number} cantidad_disponible Cantidad disponible en stock
 * @apiBody {String} fecha_ingreso Fecha de ingreso del producto
 * 
 * @apiSuccess {Object} producto Producto creado
 * 
 * @apiError {String} error Mensaje de error
 */ 
router.post('/', verifyToken, checkRole('admin'), validateSchema(crearProductoSchema), productoController.crearProducto);

/**
 * @api {put} /productos/:id Actualizar producto
 * @apiName ActualizarProducto
 * @apiGroup Productos
 * 
 * @apiParam {Number} id ID del producto
 * 
 * @apiBody {String} [numero_lote] Número de lote del producto
 * @apiBody {String} [nombre] Nombre del producto
 * @apiBody {Number} [precio] Precio del producto
 * @apiBody {Number} [cantidad_disponible] Cantidad disponible en stock
 * @apiBody {String} [fecha_ingreso] Fecha de ingreso del producto
 * 
 * @apiSuccess {Object} producto Producto actualizado
 * 
 * @apiError {String} error Mensaje de error
 */
router.put('/:id', verifyToken, checkRole('admin'), validateSchema(actualizarProductoSchema), productoController.actualizarProducto);

/**
 * @api {delete} /productos/:id Eliminar producto
 * @apiName EliminarProducto
 * @apiGroup Productos
 * 
 * @apiParam {Number} id ID del producto
 * 
 * @apiSuccess {String} mensaje Mensaje de confirmación
 * 
 * @apiError {String} error Mensaje de error
 */
router.delete('/:id', verifyToken, checkRole('admin'), productoController.eliminarProducto);

module.exports = router;
