const EspecialidadModel = require('../models/especialidad.model')

const getAllEspecialidades = async (req,res) => {
    try {
        const [result] = await EspecialidadModel.SelectAllEspecialidades()
        res.json(result)
    } catch (error) {
        res.json({fatal: error.message})
    }
}

module.exports = {getAllEspecialidades}