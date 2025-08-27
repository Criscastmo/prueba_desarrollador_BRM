//Encargado del control de rutas, middlewares y el parsing de Json solicitado
const express = require('express');
const morgan = require('morgan');
const app = express();
const dotenv = require("dotenv");

// Cargar variables de entorno
dotenv.config();

// Middlewares globales
app.use(express.json()); // Parsear a json
app.use(morgan('dev')); // Logging de peticiones

// Rutas
const rutasAutenticacion = require('./routes/autentificacion');
const rutasProductos = require('./routes/productos');
const rutasCompras = require('./routes/compras');

app.use('/api/auth', rutasAutenticacion); // Registro y login
app.use('/api/productos', rutasProductos); // CRUD productos
app.use('/api/compras', rutasCompras); // Procesos de compra y facturación

// Rutas de prueba del servidor al aire
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;