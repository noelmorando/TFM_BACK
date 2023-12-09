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

/**
 * Agrega una especialidad a un profesor cuyo Id es profesorId, tomado de la ruta, y cuyo Id de la especialidad es especialidades_id, tomado del cuerpo de la solicitud.
 * @param {any} req 
 * @param {any} res 
 * @returns any
 */
const insertEspecialidadByProfesor = async (req, res) => {
    try {
        const { profesorId, especialidadId } = req.params
        const profesor_id = parseInt(profesorId)
        const especialidades_id = parseInt(especialidadId)
        
        if (!especialidades_id) {
            return res.status(400).json({ fatal: "ID de la especialidad no proporcionado" })
        }
        const [result] = await EspecialidadModel.insertEspecialidadByProfesorId(profesor_id, especialidades_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}

module.exports = {getAllEspecialidades, getEspecialidadesByPage, getProfesoresByEspecialidadById, insertEspecialidadByProfesor}   