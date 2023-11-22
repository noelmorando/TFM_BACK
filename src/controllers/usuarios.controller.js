const UsuarioModel = require('../models/usuario.model')

const getAllUsuarios = async (req,res) => {
    try {
        const [result] = await UsuarioModel.SelectAllUsuarios()
        res.json(result)
    } catch (error) {
        res.json({fatal: error.message})
    }
}

module.exports = {getAllUsuarios}