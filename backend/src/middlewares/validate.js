/** 
* Middleware que valida req.body contra un schema Joi
* Retorna 400 con detalles si la validación falla
* Usa abortEarly: false para retornar todos los errores de una vez
*/
function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false, convert: true });
    if (error) {
      const details = error.details.map(d => d.message);
      return res.status(400).json({ error: 'Validación fallida', details });
    }
    next();
  };
}

module.exports = { validateSchema };