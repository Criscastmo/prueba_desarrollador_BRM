const Joi = require('joi');

// Esquema para crear producto
const crearProductoSchema = Joi.object({
  numero_lote: Joi.string().required().messages({
    'string.base': 'El número de lote debe ser texto',
    'string.empty': 'El número de lote es obligatorio'
  }),
  nombre: Joi.string().required().messages({
    'string.base': 'El nombre debe ser texto',
    'string.empty': 'El nombre es obligatorio'
  }),
  precio: Joi.number().positive().required().messages({
    'number.base': 'El precio debe ser un número',
    'number.positive': 'El precio debe ser mayor que 0',
    'any.required': 'El precio es obligatorio'
  }),
  cantidad_disponible: Joi.number().integer().min(0).required().messages({
    'number.base': 'La cantidad disponible debe ser un número entero',
    'number.min': 'La cantidad disponible no puede ser negativa',
    'any.required': 'La cantidad disponible es obligatoria'
  }),
  fecha_ingreso: Joi.date().required().messages({
    'date.base': 'La fecha de ingreso debe ser una fecha válida',
    'any.required': 'La fecha de ingreso es obligatoria'
  })
});

// Esquema para actualizar producto
const actualizarProductoSchema = Joi.object({
  numero_lote: Joi.string(),
  nombre: Joi.string(),
  precio: Joi.number().positive(),
  cantidad_disponible: Joi.number().integer().min(0),
  fecha_ingreso: Joi.date()
});

module.exports = {
  crearProductoSchema,
  actualizarProductoSchema
};
