const EspecialidadModel = require('../models/especialidad.model')

/**
 * Recupera todas las especialidades.
 * @param {any} req 
 * @param {any} res 
 */
const getAllEspecialidades = async (req,res) => {
    try {
        const [result] = await EspecialidadModel.SelectAllEspecialidades()
        res.json(result)
    } catch (error) {
        res.json({fatal: error.message})
    }
}

/**
 * Recupera todas las especialidades, incluye paginación.
 * @param {any} req 
 * @param {any} res 
 */
const getEspecialidadesByPage = async (req,res) => {
    const {p = 1} = req.query;
    const {limit = 10} = req.query;

    try{
        
        const [result] = await EspecialidadModel.SelectEspecialidadesByPage(parseInt(p),parseInt(limit));
        res.json(result);
    } catch (error){
       res.json({fatal: error.message});
    }
}
/**
 * Recupera todos los usuarios por especialidad cuyo Id es especialidadId, incluye paginación
 * @param {any} req 
 * @param {any} res 
 */
const getProfesoresByEspecialidadById = async (req,res) => {
    const {p = 1} = req.query;
    const {limit = 10} = req.query;

    try {
        const {especialidadId} = req.params
        const [result] = await EspecialidadModel.getUsuariosByEspecialidad(especialidadId, parseInt(p),parseInt(limit));
        res.json(result)
    } catch (error) {
        res.json({fatal: error.message})
    }
}

module.exports = {getAllEspecialidades, getEspecialidadesByPage, getProfesoresByEspecialidadById}