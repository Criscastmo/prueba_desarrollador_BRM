const express = require('express');
const router = express.Router();

const { crearCompra } = require('../controllers/compraController');
const { validateCompra } = require('../validators/compraValidators');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');

// Crea la compra solo para clientes
router.post('/', verifyToken, checkRole('cliente'), validateCompra, compraController.crearCompra);

// Obtener factura de una compra (cliente solo suya, admin puede cualquiera)
// verifyToken es suficiente; el controlador valida la propiedad/permiso
router.get('/:id', verifyToken, compraController.obtenerFactura);

// Listar todas las compras (solo admin)
router.get('/', verifyToken, checkRole('admin'), compraController.listarCompras);

module.exports = router;