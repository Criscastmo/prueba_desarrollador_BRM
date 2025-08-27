//Encargado del control de rutas, middlewares y el parsing de Json solicitado
const express = require('express');
const app = express();

// Middleware para JSON
app.use(express.json());

// Rutas de prueba
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

module.exports = app;