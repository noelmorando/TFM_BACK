const UsuarioModel = require('../models/usuario.model')
/**
 * Recupera todos los usuarios de la base de datos.
 * @param {any} req 
 * @param {any} res 
 */
const getAllUsuarios = async (req,res) => {
    try {
        const [result] = await UsuarioModel.SelectAllUsuarios()
        res.json(result)
    } catch (error) {
        res.json({fatal: error.message})
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
        res.json(result[0])
    } catch (error){
       res.json({fatal: error.message})
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
        res.json(result)
    } catch (error) {
        res.json({fatal: error.message})
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
        res.json(result)
    } catch (error) {
        res.json({fatal: error.message})
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
        res.json(result)
    } catch (error) {
        res.json({fatal: error.message})
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
        res.json(result)
    } catch (error) {
        res.json({fatal: error.message})
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
        res.json(usuario[0])
    } catch (error){
       res.json({fatal: error.message})
    }
}
/**
 * Agrega una especialidad a un profesor cuyo Id es profesorId. Se debe especificar en el cuerpo de la solicitud el Id de la especialidad "especialidades_id".
 * @param {any} req 
 * @param {any} res 
 * @returns any
 */
const insertEspecialidadByProfesor = async (req, res) => {
    try {
        const { profesorId } = req.params;
        const { especialidades_id } = req.body;
        if (!especialidades_id) {
            return res.status(400).json({fatal: error.message});
        }
        const [result] = await UsuarioModel.insertEspecialidadByProfesorId(profesorId, especialidades_id);
        res.json(result);
    } catch (error) {
        res.status(500).json({fatal: error.message});
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
        res.json(result)
    } catch (error) {
        res.json({fatal: error.message})
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
        res.json(result)
    } catch (error) {
        res.json({fatal: error.message})
    }
}

module.exports = {getAllUsuarios, updateUsuario, deleteUsuario, createUsuario, getUsuarioById, getEspecialidadByProfesorId,getChatByUsuariosId,getPuntuacionesByProfesorId,getClasesByUsuariosId,insertEspecialidadByProfesor}