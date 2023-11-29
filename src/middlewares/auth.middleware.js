const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuario.model');
const checkToken = async (req, res, next) => {
    try {
        // Comprobar que el token viene en la cabecera
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(403).json({ fatal: 'Necesitas la cabecera de autorización' });
        }

        const tokenParts = token.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(403).json({ fatal: 'Formato de token inválido' });
        }

        const decodedToken = jwt.verify(tokenParts[1], process.env.SECRET_KEY);

        // Buscar al usuario por su ID en la base de datos
        const usuarioRows = await UsuarioModel.selectUsuarioById(decodedToken.id);

        if (usuarioRows.length === 0) {
            return res.status(404).json({ fatal: 'Usuario no encontrado' });
        }

        const usuario = usuarioRows[0]; // Obtener el primer usuario encontrado

        req.usuario = usuario;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ fatal: 'Token inválido' });
        }
        return res.status(403).json({ fatal: error.message });
    }
};
const checkRole = (rol) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'No token provided or invalid format' });
            }

            const token = authHeader.split(' ')[1]; // Obtener solo el token, eliminando 'Bearer '

            const decoded = await new Promise((resolve, reject) => {
                jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(decoded);
                });
            });

            if (!decoded || !decoded.user_rol) {
                return res.status(403).json({ message: 'Token inválido o sin rol' });
            }
            if (rol.includes(decoded.user_rol)) {
                next();
            } else {
                return res.status(403).json({ message: 'No tienes permisos para acceder' });
            }
        } catch (error) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
    };
};


const preAuthMiddleware = (req, res, next) => {
    // Validaciones previas a la autenticación
    const { mail, pass } = req.body;

    if (!mail || !pass) {
        return res.status(400).json({ error: 'Faltan datos de inicio de sesión' });
    }


    next();
};





module.exports = { checkToken, checkRole, preAuthMiddleware };