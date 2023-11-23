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
 * Recupera las especialidades de un usuario cuyo Id es usuarioId.
 * @param {any} req 
 * @param {any} res 
 */
const  getEspecialidadByUsuarioId = async (req,res) => {
    try {
        const {usuarioId} = req.params
        const [result] = await UsuarioModel.selectEspecialidadesByUsuarioId(usuarioId)
        res.json(result[0])
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

module.exports = {getAllUsuarios, updateUsuario, deleteUsuario, createUsuario, getUsuarioById, getEspecialidadByUsuarioId}