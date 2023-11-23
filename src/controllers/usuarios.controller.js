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
        const [result] = await UsuarioModel.selectEspecialidadesByUsuarioId(profesorId)
        res.json(result)
    } catch (error) {
        res.json({fatal: error.message})
    }
}
/**
 * Recupera el chat del profesor-alumno, pasandole como parámetro el Id del profesor y el Id del alumno. Notar que usuarioId hace referencia al usuario que está logueado, y el usuario2Id al usuario con el que mantiene el chat. Por ejemplo, si el usuario logueado es profesor y quiere ver el chat con un alumno en particular, entonces el usuarioId será el del profesor, mientras que el usuario2Id será el del alumno.
 * @param {any} req 
 * @param {any} res 
 */
const getChatByUsuariosId = async (req,res) => {
    try {
        const {usuarioId,usuario2Id} = req.params
        const [result] = await UsuarioModel.selectChatByUsuariosId(usuarioId,usuario2Id)
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
        console.log(req.body)
        const [result] = await UsuarioModel.insertUsuario(req.body)
        const [usuario] = await UsuarioModel.selectUsuarioById(result.insertId)
        res.json(usuario[0])
    } catch (error){
       res.json({fatal: error.message})
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

module.exports = {getAllUsuarios, updateUsuario, deleteUsuario, createUsuario, getUsuarioById, getEspecialidadByProfesorId,getChatByUsuariosId}