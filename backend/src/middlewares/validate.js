// middleware que valida req.body contra un schema Joi
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