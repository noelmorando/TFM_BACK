const UsuarioModel = require('../models/usuario.model')
bcrypt = require('bcryptjs');
const { createToken } = require('../helpers/utils');
/**
 * Recupera todos los usuarios de la base de datos.
 * @param {any} req 
 * @param {any} res 
 */
//TODO: SE ENVIA SOLO EL NOMBRE, APELLIDOS, PASS, MAIL.
const register = async (req, res) => {
    try {
        //Encriptamos la password
        const hashedPassword = bcrypt.hashSync(req.body.pass, 8);
        const { nombre, apellidos, mail } = req.body;

        // Inserta el usuario en la base de datos
        const result = await UsuarioModel.insertUsuario({ nombre, apellidos, mail, pass: hashedPassword });

        res.status(200).json('Usuario registrado correctamente');

    } catch (error) {
        res.status(500).json({ fatal: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { mail, pass } = req.body;
        // Realiza una consulta para obtener el usuario por correo electrónico
        const query = 'SELECT * FROM usuarios WHERE mail = ?';
        const [rows, fields] = await db.query(query, [mail]);

        if (!rows || !rows.length) {
            return res.json({ fatal: 'Error en email y/o password' });
        }

        const usuario = rows[0];

        //¿Coincide la password de la BBDD con la del body(login)
        const equals = bcrypt.compareSync(pass, usuario.pass);
        if (!equals) {
            return res.json({ fatal: 'Error en email y/o password' });
        }
        res.status(200).json({
            success: 'Login correcto!!',
            token: createToken(usuario)
        });

    } catch (error) {
        res.status(500).json({ fatal: error.message });
    }
};


const getAllUsuarios = async (req, res) => {
    try {
        const [result] = await UsuarioModel.SelectAllUsuarios()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Recupera los datos de un usuario cuyo Id es usuarioId.
 * @param {any} req 
 * @param {any} res 
 */
const getUsuarioById = async (req, res) => {
    try {
        const { usuarioId } = req.params
        const usuario_id = parseInt(usuarioId)
        const [result] = await UsuarioModel.selectUsuarioById(usuario_id);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}

/**
 * Recupera las clases de un usuario (sea profesor o alumno), enviando como parámetros usuarioId.
 * @param {any} req 
 * @param {any} res 
 */
const getClasesByUsuarioId = async (req, res) => {
    try {
        const { usuarioId } = req.params
        const usuario_id = parseInt(usuarioId)
        const [result] = await UsuarioModel.selectClasesByUsuarioId(usuario_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Recupera las especialidades de un profesor cuyo Id es profesorId.
 * @param {any} req 
 * @param {any} res 
 */
const getEspecialidadByProfesorId = async (req, res) => {
    try {
        const { profesorId } = req.params
        const profesor_id = parseInt(profesorId)
        const [result] = await UsuarioModel.selectEspecialidadesByProfesorId(profesor_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Recupera el chat del profesor-alumno, pasandole como parámetro el Id del profesor y el Id del alumno, en ese orden.
 * @param {any} req 
 * @param {any} res 
 */
const getChatByUsuariosId = async (req, res) => {
    try {
        const { profesorId, alumnoId } = req.params
        const profesor_id = parseInt(profesorId)
        const alumno_id = parseInt(alumnoId)
        const [result] = await UsuarioModel.selectChatByUsuariosId(profesor_id, alumno_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Recupera las puntuaciones de un profesor.
 * @param {any} req 
 * @param {any} res 
 */
const getPuntuacionesByProfesorId = async (req, res) => {
    try {
        const { profesorId } = req.params
        const profesor_id = parseInt(profesorId)
        const [result] = await UsuarioModel.selectPuntuacionesByprofesorId(profesor_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Recupera los alumnos de un profesor.
 * @param {any} req 
 * @param {any} res 
 */
const getAlumnosByProfesorId = async (req, res) => {
    try {
        const { profesorId } = req.params
        const profesor_id = parseInt(profesorId)
        const [result] = await UsuarioModel.selectAlumnosByprofesorId(profesor_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}

/**
 * Recupera las clases entre un profesor y un alumno, enviando como parámetros profesorId y alumnoId, en ese orden.
 * @param {any} req 
 * @param {any} res 
 */
const getClasesByUsuariosId = async (req, res) => {
    try {
        const { profesorId, alumnoId } = req.params
        const profesor_id = parseInt(profesorId)
        const alumno_id = parseInt(alumnoId)
        const [result] = await UsuarioModel.selectClasesByUsuariosId(profesor_id, alumno_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Agrega una especialidad a un profesor cuyo Id es profesorId, tomado de la ruta, y cuyo Id de la especialidad es especialidades_id, tomado del cuerpo de la solicitud.
 * @param {any} req 
 * @param {any} res 
 * @returns any
 */
const insertEspecialidadByProfesor = async (req, res) => {
    try {
        const { profesorId } = req.params
        const profesor_id = parseInt(profesorId)
        const { especialidades_id } = req.body
        if (!especialidades_id) {
            return res.status(400).json({ fatal: "ID de la especialidad no proporcionado en el cuerpo de la solicitud." });
        }
        const [result] = await UsuarioModel.insertEspecialidadByProfesorId(profesor_id, especialidades_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}

/**
 * El profesor, cuyo Id es profesorId, tomado de la ruta, crea una nueva clase.
 * @param {any} req 
 * @param {any} res 
 * @returns any
 */
const insertClaseByProfesor = async (req, res) => {
    try {
        const { profesorId } = req.params
        const profesor_id = parseInt(profesorId)
        const { alumno_id, fecha } = req.body
        if (!alumno_id && !fecha) {
            return res.status(400).json({ fatal: "alumno_id y fecha no proporcionados en el cuerpo de la solicitud." })
        } else if (!alumno_id) {
            return res.status(400).json({ fatal: "alumno_id no proporcionado en el cuerpo de la solicitud." })
        } else if (!fecha) {
            return res.status(400).json({ fatal: "fecha no proporcionada en el cuerpo de la solicitud." })
        }
        const [result] = await UsuarioModel.insertClaseByProfesorId(profesor_id, req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}

/**
 * Agrega un nuevo comentario al chat.
 * @param {any} req 
 * @param {any} res 
 * @returns any
 */
const insertChatByUsersId = async (req, res) => {
    try {
        const { profesorId } = req.params
        const profesor_id = parseInt(profesorId)
        const { alumno_id, comentarios } = req.body
        if (!alumno_id && !comentarios) {
            return res.status(400).json({ fatal: "alumno_id y comentarios no proporcionados en el cuerpo de la solicitud." })
        } else if (!alumno_id) {
            return res.status(400).json({ fatal: "alumno_id no proporcionado en el cuerpo de la solicitud." })
        } else if (!comentarios) {
            return res.status(400).json({ fatal: "comentarios no proporcionada en el cuerpo de la solicitud." })
        }
        const [result] = await UsuarioModel.insertChatByUsersId(profesor_id, req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}

/**
 * Actualiza los datos de un usuario cuyo Id es usuarioId.
 * @param {any} req 
 * @param {any} res 
 */
const updateUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params
        const usuario_id = parseInt(usuarioId)
        const [result] = await UsuarioModel.updateUsuarioById(usuario_id, req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Elimina un usuario cuyo Id es usuarioId.
 * @param {any} req 
 * @param {any} res 
 */
const deleteUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params
        const usuario_id = parseInt(usuarioId)
        const [result] = await UsuarioModel.deleteUsuarioById(usuario_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Elimina una especialidad de un profesor, cuyo Id es profesorId, tomado de la ruta, y cuyo Id de la especialidad es especialidades_id, tomado del cuerpo de la solicitud.
 * @param {any} req 
 * @param {any} res 
 */
const deleteEspecialidadByUsuario = async (req, res) => {
    try {
        const { profesorId } = req.params
        const profesor_id = parseInt(profesorId)
        const { especialidades_id } = req.body
        if (!especialidades_id) {
            return res.status(400).json({ fatal: "ID de la especialidad no proporcionado en el cuerpo de la solicitud." })
        }
        const [result] = await UsuarioModel.deleteEspecialidadByUsuarioById(profesor_id, especialidades_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}

/**
 * Elimina una clase de un profesor cuyo Id es profesorId, tomado de la ruta, cuyo Id del alumno es alumno_id
 * @param {any} req 
 * @param {any} res 
 * @returns any
 */
const deleteClaseByProfesorId = async (req, res) => {
    try {
        const { profesorId } = req.params
        const profesor_id = parseInt(profesorId)
        const { alumno_id, fecha } = req.body
        if (!alumno_id && !fecha) {
            return res.status(400).json({ fatal: "alumno_id y fecha no proporcionados en el cuerpo de la solicitud." })
        } else if (!alumno_id) {
            return res.status(400).json({ fatal: "alumno_id no proporcionado en el cuerpo de la solicitud." })
        } else if (!fecha) {
            return res.status(400).json({ fatal: "fecha no proporcionada en el cuerpo de la solicitud." })
        }
        const [result] = await UsuarioModel.deleteClaseByProfesorIdByClaseId(profesor_id, alumno_id, fecha)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}

module.exports = { getAllUsuarios, updateUsuario, deleteUsuario, createUsuario, getUsuarioById, getClasesByUsuarioId, getEspecialidadByProfesorId, getChatByUsuariosId, getPuntuacionesByProfesorId, getAlumnosByProfesorId, getClasesByUsuariosId, insertEspecialidadByProfesor, deleteEspecialidadByUsuario, deleteClaseByProfesorId, insertClaseByProfesor, insertChatByUsersId, login, register }