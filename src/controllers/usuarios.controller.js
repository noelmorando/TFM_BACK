const UsuarioModel = require('../models/usuario.model')
/**
 * Recupera todos los usuarios de la base de datos.
 * @param {any} req 
 * @param {any} res 
 */
const getAllUsuarios = async (req,res) => {
    try {
        const [result] = await UsuarioModel.SelectAllUsuarios()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({fatal: error.message})
    }
}
/**
 * Recupera los datos de un usuario cuyo Id es usuarioId.
 * @param {any} req 
 * @param {any} res 
 */
const getUsuarioById = async (req, res) => {
    try{
        const {usuarioId} = req.params
        const [result] = await UsuarioModel.selectUsuarioById(usuarioId);
        res.status(200).json(result)
    } catch (error){
        res.status(500).json({fatal: error.message})
    }
}
/**
 * Recupera las especialidades de un profesor cuyo Id es profesorId.
 * @param {any} req 
 * @param {any} res 
 */
const  getEspecialidadByProfesorId = async (req,res) => {
    try {
        const {profesorId} = req.params
        const [result] = await UsuarioModel.selectEspecialidadesByProfesorId(profesorId)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({fatal: error.message})
    }
}
/**
 * Recupera el chat del profesor-alumno, pasandole como parámetro el Id del profesor y el Id del alumno, en ese orden.
 * @param {any} req 
 * @param {any} res 
 */
const getChatByUsuariosId = async (req,res) => {
    try {
        const {profesorId,alumnoId} = req.params
        const [result] = await UsuarioModel.selectChatByUsuariosId(profesorId,alumnoId)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({fatal: error.message})
    }
}
/**
 * Recupera las puntuaciones de un profesor.
 * @param {any} req 
 * @param {any} res 
 */
const getPuntuacionesByProfesorId = async (req,res) => {
    try {
        const {profesorId} = req.params
        const [result] = await UsuarioModel.selectPuntuacionesByprofesorId(profesorId)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({fatal: error.message})
    }
}

/**
 * Recupera las clases entre un profesor y un alumno, enviando como parámetros profesorId y alumnoId, en ese orden.
 * @param {any} req 
 * @param {any} res 
 */
const getClasesByUsuariosId = async (req,res) => {
    try {
        const {profesorId,alumnoId} = req.params
        const [result] = await UsuarioModel.selectClasesByUsuarioId(profesorId,alumnoId)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({fatal: error.message})
    }
}

/**
 * Crea un usuario.
 * @param {any} req 
 * @param {any} res 
 */
const createUsuario = async (req, res) => {
    try{
        const [result] = await UsuarioModel.insertUsuario(req.body)
        const [usuario] = await UsuarioModel.selectUsuarioById(result.insertId)
        res.status(200).json(usuario[0])
    } catch (error){
        res.status(500).json({fatal: error.message})
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
        const { especialidades_id } = req.body
        if (!especialidades_id) {
            return res.status(400).json({fatal: "ID de la especialidad no proporcionado en el cuerpo de la solicitud."});
        }
        const [result] = await UsuarioModel.insertEspecialidadByProfesorId(profesorId, especialidades_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({fatal: error.message})
    }
}

/**
 * El profesor, cuyo Id es profesorId, tomado de la ruta, crea una nueva clase.
 * @param {any} req 
 * @param {any} res 
 * @returns any
 */
const insertClaseByProfesor = async (req,res) => {
    try {
        const {profesorId} = req.params
        const profesor_id = parseInt(profesorId)
        const {alumno_id,fecha} = req.body
        if (!alumno_id && !fecha){
            return res.status(400).json({fatal: "alumno_id y fecha no proporcionados en el cuerpo de la solicitud."})
        }else if(!alumno_id){
            return res.status(400).json({fatal: "alumno_id no proporcionado en el cuerpo de la solicitud."})
        }else if (!fecha){
            return res.status(400).json({fatal: "fecha no proporcionada en el cuerpo de la solicitud."})
        }
        const [result] = await UsuarioModel.insertClaseByProfesorId(profesor_id,req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({fatal: error.message})
    }
}

/**
 * Agrega un nuevo comentario al chat.
 * @param {any} req 
 * @param {any} res 
 * @returns any
 */
const insertChatByUsersId = async (req,res) => {
    try {
        const {profesorId} = req.params
        const profesor_id = parseInt(profesorId)
        const {alumno_id,comentarios} = req.body
        if (!alumno_id && !comentarios){
            return res.status(400).json({fatal: "alumno_id y comentarios no proporcionados en el cuerpo de la solicitud."})
        }else if(!alumno_id){
            return res.status(400).json({fatal: "alumno_id no proporcionado en el cuerpo de la solicitud."})
        }else if (!comentarios){
            return res.status(400).json({fatal: "comentarios no proporcionada en el cuerpo de la solicitud."})
        }
        const [result] = await UsuarioModel.insertChatByUsersId(profesor_id,req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({fatal: error.message})
    }
}

/**
 * Actualiza los datos de un usuario cuyo Id es usuarioId.
 * @param {any} req 
 * @param {any} res 
 */
const updateUsuario = async (req,res) => {
    try {
        const {usuarioId} = req.params
        const [result] = await UsuarioModel.updateUsuarioById(usuarioId,req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({fatal: error.message})
    }
}
/**
 * Elimina un usuario cuyo Id es usuarioId.
 * @param {any} req 
 * @param {any} res 
 */
const deleteUsuario = async (req,res) => {
    try {
        const {usuarioId} = req.params
        const [result] = await UsuarioModel.deleteUsuarioById(usuarioId)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({fatal: error.message})
    }
}
/**
 * Elimina una especialidad de un profesor, cuyo Id es profesorId, tomado de la ruta, y cuyo Id de la especialidad es especialidades_id, tomado del cuerpo de la solicitud.
 * @param {any} req 
 * @param {any} res 
 */
const deleteEspecialidadByUsuario = async (req,res) => {
    try {
        const {profesorId} = req.params
        const {especialidades_id} = req.body
        if(!especialidades_id){
            return res.status(400).json({fatal: "ID de la especialidad no proporcionado en el cuerpo de la solicitud."})
        }
        const [result] = await UsuarioModel.deleteEspecialidadByUsuarioById(profesorId,especialidades_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({fatal: error.message})
    }
}

/**
 * Elimina una clase de un profesor cuyo Id es profesorId, tomado de la ruta, cuyo Id del alumno es alumno_id
 * @param {any} req 
 * @param {any} res 
 * @returns any
 */
const deleteClaseByProfesorId = async (req,res) => {
    try {
        const {profesorId} = req.params
        const {alumno_id,fecha} = req.body
        if (!alumno_id && !fecha){
            return res.status(400).json({fatal: "alumno_id y fecha no proporcionados en el cuerpo de la solicitud."})
        }else if(!alumno_id){
            return res.status(400).json({fatal: "alumno_id no proporcionado en el cuerpo de la solicitud."})
        }else if (!fecha){
            return res.status(400).json({fatal: "fecha no proporcionada en el cuerpo de la solicitud."})
        }
        const [result] = await UsuarioModel.deleteClaseByProfesorIdByClaseId(profesorId,alumno_id,fecha)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({fatal: error.message})
    }
}

module.exports = {getAllUsuarios, updateUsuario, deleteUsuario, createUsuario, getUsuarioById, getEspecialidadByProfesorId,getChatByUsuariosId,getPuntuacionesByProfesorId,getClasesByUsuariosId,insertEspecialidadByProfesor,deleteEspecialidadByUsuario,deleteClaseByProfesorId,insertClaseByProfesor,insertChatByUsersId}