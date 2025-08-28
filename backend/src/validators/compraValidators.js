/**
 * Validadores para compras usando Joi
 * Define esquemas y funciones middleware para validar req.body
 */
const Joi = require('joi');
// Crea el esquema para la validación de compras
const compraSchema = Joi.object({
  productos: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().positive().required(),
        cantidad: Joi.number().integer().positive().required(),
      })
    )
    .min(1)
    .required(),
});
// Valida el cuerpo de la solicitud
exports.validateCompra = (req, res, next) => {
  const { error } = compraSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((d) => d.message).join(', ') });
  }
  next();
};