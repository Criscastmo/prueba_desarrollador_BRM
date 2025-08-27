// Controlador CRUD de productos
const e = require('express');
const { Producto } = require('../models');

// Crear producto
async function crearProducto(req, res) {
    try {
        // captura de los datos
        const { numero_lote, nombre, precio, cantidad_disponible, fecha_ingreso } = req.body;
        // Creación del producto
        const producto = await Producto.create({
            numero_lote,
            nombre,
            precio,
            cantidad_disponible,
            fecha_ingreso,
        });
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear producto', detalle: error.message });
    }
}

// Listar todos los productos
async function listarProductos(req, res) {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al listar productos', detalle: error.message });
    }
}

// Ver un producto por ID
async function obtenerProducto(req, res) {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);

        if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener producto', detalle: error.message });
    }
}

// Actualizar producto
async function actualizarProducto(req, res) {
    try {
        const { id } = req.params;
        const { numero_lote, nombre, precio, cantidad_disponible, fecha_ingreso } = req.body;
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        await producto.update({ numero_lote, nombre, precio, cantidad_disponible, fecha_ingreso });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar producto', detalle: error.message });
    }
}

// Eliminar producto
async function eliminarProducto(req, res) {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);
        if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
        }
        await producto.destroy();
        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar producto', detalle: error.message });
    }
}


module.exports = {
    crearProducto,
    listarProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto,
};