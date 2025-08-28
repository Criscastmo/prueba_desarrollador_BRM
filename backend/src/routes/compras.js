const express = require('express');
const router = express.Router();

const compraController = require('../controllers/compraController');
const { validateCompra } = require('../validators/compraValidators');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');

/**
 * @api {post} /compras/ Crear compra
 * @apiName CrearCompra
 * @apiGroup Compras
 * 
 * @apiBody {Array} productos Array de productos a comprar
 * @apiBody {Number} productos.id ID del producto
 * @apiBody {Number} productos.cantidad Cantidad del producto
 * 
 * @apiSuccess {String} message Mensaje de confirmación
 * @apiSuccess {Number} compra_id ID de la compra creada
 * @apiSuccess {Number} total Total de la compra
 * 
 * @apiError {String} error Mensaje de error según el caso
 */
router.post('/', verifyToken, checkRole('cliente'), validateCompra, compraController.crearCompra);

/**
 * @api {get} /compras/listar Listar todas las compras
 * @apiName ListarCompras
 * @apiGroup Compras
 * 
 * @apiQuery {Number} [page] Número de página (por defecto 1)
 * @apiQuery {Number} [limit] Resultados por página (por defecto 10)
 * 
 * @apiSuccess {Number} total Total de compras
 * @apiSuccess {Number} pagina Página actual
 * @apiSuccess {Number} paginas Total de páginas
 * @apiSuccess {Array} resultados Lista de compras con usuario y detalles
 * 
 * @apiError {String} error Mensaje de error
 */
// Listar todas las compras (solo admin)
router.get('/listar', verifyToken, checkRole('admin'), compraController.listarCompras);

/**
 * @api {get} /compras/historial Obtener historial de compras
 * @apiName ObtenerHistorial
 * @apiGroup Compras
 * 
 * @apiQuery {Number} [page] Número de página (por defecto 1)
 * @apiQuery {Number} [limit] Resultados por página (por defecto 10)
 * 
 * @apiSuccess {Number} total Total de compras del cliente
 * @apiSuccess {Number} pagina Página actual
 * @apiSuccess {Number} paginas Total de páginas
 * @apiSuccess {Array} resultados Lista de compras del cliente con detalles
 * 
 * @apiError {String} error Mensaje de error
 */
// Obtener historial de compras del cliente autenticado
router.get('/historial', verifyToken, checkRole('cliente'), compraController.obtenerHistorial);

/**
 * @api {get} /compras/:id Obtener factura de compra
 * @apiName ObtenerFactura
 * @apiGroup Compras
 * 
 * @apiParam {Number} id ID de la compra
 * 
 * @apiSuccess {Object} compra Datos completos de la compra con usuario y detalles
 * 
 * @apiError {String} error Mensaje de error
 */
// Obtener factura de una compra (cliente solo suya, admin puede cualquiera)
// verifyToken es suficiente; el controlador valida la propiedad/permiso
router.get('/:id', verifyToken, compraController.obtenerFactura);


module.exports = router;