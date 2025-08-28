/**
 * Middleware para validar JWT y roles
 * Usa jsonwebtoken para verificar tokens
*/
const jwt = require('jsonwebtoken');
const { Usuario, Rol } = require('../models');

// Verificar token JWT
async function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    // Manejo de token no proporcionado
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }
    // Verificar token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mi_secreto');
        // Guardamos info en req para usarla después
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
}

    // Verificar rol (admin o cliente)
    function checkRole(roleName) {
        return async (req, res, next) => {
            try {
                const usuario = await Usuario.findByPk(req.userId, {
                include: { model: Rol, as: 'rol' },
                });

                if (!usuario) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }

                if (usuario.rol.nombre !== roleName) {
                    return res.status(403).json({ error: 'No tienes permisos para esta acción' });
                }
                next();
            } catch (err) {
                return res.status(500).json({ error: 'Error al verificar rol' });
            }
        };
    }


module.exports = {
    verifyToken,
    checkRole,
};