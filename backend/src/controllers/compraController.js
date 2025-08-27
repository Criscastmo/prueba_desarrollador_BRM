const { Usuario, Producto, Compra, DetalleCompra } = require('../models');

// Crear una compra
async function crearCompra(req, res) {
  const { productos } = req.body;
  const usuarioId = req.userId; // viene del token

  if (!productos || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ error: 'Debe enviar una lista de productos' });
  }

  try {
    // Validar que el usuario exista
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    let total = 0;
    const detalles = [];

    // Validar stock y calcular total
    for (const item of productos) {
      const producto = await Producto.findByPk(item.id);

      if (!producto) {
        return res.status(404).json({ error: `Producto con id ${item.id} no encontrado` });
      }
      // validación del stock
      if (producto.cantidad_disponible < item.cantidad) {
        return res.status(400).json({
          error: `Stock insuficiente para el producto ${producto.nombre}`,
        });
      }
      // Calcular subtotal con cantidad y precio
      const subtotal = producto.precio * item.cantidad;
      total += subtotal;

      // Agregar detalle de compra, por cada producto
      detalles.push({
        producto_id: producto.id,
        cantidad: item.cantidad,
        precio_unitario: producto.precio,
        subtotal,
      });
    }

    // Crear compra en la base de datos
    const compra = await Compra.create({
      usuario_id: usuarioId,
      total,
      fecha_compra: new Date(),
    });

    // Crear detalles de la compra y actualizar stock
    for (const d of detalles) {
      await DetalleCompra.create({
        compra_id: compra.id,
        producto_id: d.producto_id,
        cantidad: d.cantidad,
        precio_unitario: d.precio_unitario,
        subtotal: d.subtotal,
      });

      // Descontar stock
      const producto = await Producto.findByPk(d.producto_id);
      producto.cantidad_disponible -= d.cantidad;
      await producto.save();
    }

    return res.status(201).json({
      message: 'Compra realizada con éxito',
      compra_id: compra.id,
      total,
    });
  } catch (error) {
    console.error('Error en crearCompra:', error);
    return res.status(500).json({ error: 'Error al procesar la compra' });
  }
}

// Obtener una factura
async function obtenerFactura(req, res){
  try {
    const compraId = Number(req.params.id);
    if (!Number.isInteger(compraId) || compraId <= 0) {
      return res.status(400).json({ error: 'ID de compra inválido' });
    }

    // verifyToken setea req.userId y req.userRole
    const userId = req.userId;
    const userRole = (req.userRole || '').toString().toLowerCase();

    // Incluir asociaciones usando los alias definidos en models/index.js
    const compra = await Compra.findByPk(compraId, {
      include: [
        { model: Usuario, as: 'usuario', attributes: ['id', 'nombre', 'email'] },
        {
          model: DetalleCompra,
          as: 'detalles',
          include: [{ model: Producto, as: 'producto', attributes: ['id', 'nombre', 'precio'] }],
        },
      ],
    });

    if (!compra) {
      return res.status(404).json({ error: 'Compra no encontrada' });
    }

    // Permisos: cliente solo puede ver su propia compra; admin puede ver cualquier compra
    if (userRole !== 'admin' && compra.usuario_id !== userId) {
      return res.status(403).json({ error: 'No tienes permiso para ver esta factura' });
    }

    return res.json(compra);
  } catch (err) {
    console.error('Error en obtenerFactura:', err);
    return res.status(500).json({ error: 'Error al obtener la factura' });
  }
}

// Listar todas las compras (solo admin)
async function listarCompras (req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    const compras = await Compra.findAndCountAll({
      include: [
        { model: Usuario, as: 'usuario', attributes: ['id', 'nombre', 'email'] },
        {
          model: DetalleCompra,
          as: 'detalles',
          include: [{ model: Producto, as: 'producto', attributes: ['id', 'nombre', 'precio'] }],
        },
      ],
      limit,
      offset,
      order: [['fecha_compra', 'DESC']],
    });

    res.json({
      total: compras.count,
      pagina: page,
      paginas: Math.ceil(compras.count / limit),
      resultados: compras.rows,
    });
  } catch (err) {
    console.error('Error al listar compras:', err);
    res.status(500).json({ error: 'Error al listar compras' });
  }
}

module.exports = {
    crearCompra,
    obtenerFactura,
    listarCompras
};