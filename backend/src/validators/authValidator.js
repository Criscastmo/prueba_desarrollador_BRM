// Validadores para registro y login usando Joi

const Joi = require('joi');


// Validación de datos de registro
const registerSchema = Joi.object({
    nombre: Joi.string().min(3).max(100).required(),
    direccion: Joi.string().min(5).max(200).required(),
    telefono: Joi.string().pattern(/^[0-9]{7,15}$/).required(),
    documento: Joi.string().min(5).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
});

// Validación de datos de login
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
});


function validateRegister(req, res, next) {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}


function validateLogin(req, res, next) {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

module.exports = {
    validateRegister,
    validateLogin,
};