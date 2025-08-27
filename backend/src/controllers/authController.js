// Controlador de registro y login

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario, Rol } = require('../models');

// Trae las variebles de .env, o se colocan valores por defecto si no se programan, (solo para desarrollo)
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1h';


module.exports = {
    // Registro de usuario
    async register(req, res) {
        try {
            const { nombre, direccion, telefono, documento, email, password} = req.body;
            // Verificar si el usuario ya existe por email
            const existe = await Usuario.findOne({ where: { email } });
            if (existe) {
                return res.status(400).json({ error: 'El email ya está registrado' });
            }

            const existeDocumento = await Usuario.findOne({ where: { documento } });
                if (existeDocumento) {
                return res.status(400).json({ error: 'El documento ya está registrado' });
            }

            // Hash del password
            const hashedPassword = await bcrypt.hash(password, 10);


            // Crear usuario
            const usuario = await Usuario.create({
                nombre,
                direccion,
                telefono,
                documento,
                email,
                password: hashedPassword,
                rol_id: 2,
            });

            // Retorna exito de la funcion
            return res.status(201).json({
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: 'cliente',
            });

        } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error en el registro de usuario' });
        }
    },


// Login de usuario
    async login(req, res) {
        try {
            // Obtener credenciales
            const { email, password } = req.body;
            const usuario = await Usuario.findOne({
                where: { email },
                include: [{ model: Rol, as: 'rol' }],
            });
            // Mensaje para usuario no encontrado, y facilitar caracterización de error
            if (!usuario) {
                return res.status(401).json({ error: 'Credenciales incorrectas' });
            }
            // Verificar contraseña no especifica el error al cliente por seguridad
            const passwordValida = await bcrypt.compare(password, usuario.password);
            if (!passwordValida) {
                return res.status(401).json({ error: 'Email o contraseña incorrectos' });
            }
            // Generar el token de la sesión
            const token = jwt.sign(
                { id: usuario.id, rol: usuario.rol.nombre },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES }
            );
            // Respuesta de login 
            return res.json({
                token,
                usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol.nombre,
                },
            });
        } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error en el login de usuario' });
        }
    },
};