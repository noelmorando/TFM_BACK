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
 * Recupera todos los usuarios por especialidad cuyo Id es especialidadId.
 * @param {any} req 
 * @param {any} res 
 */
const getProfesoresByEspecialidadById = async (req,res) => {
    try {
        const {especialidadId} = req.params
        const [result] = await EspecialidadModel.getUsuariosByEspecialidad(especialidadId)
        res.json(result)
    } catch (error) {
        res.json({fatal: error.message})
    }
}

module.exports = {getAllEspecialidades, getProfesoresByEspecialidadById}