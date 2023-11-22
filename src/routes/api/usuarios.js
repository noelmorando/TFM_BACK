const router = require('express').Router()
const UsuariosController = require('../../controllers/usuarios.controller')

router.get('/', UsuariosController.getAllUsuarios)

module.exports = router