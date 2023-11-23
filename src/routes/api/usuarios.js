const router = require('express').Router();
const UsuariosController = require('../../controllers/usuarios.controller');

router.get('/', UsuariosController.getAllUsuarios);
router.get('/:usuarioId', UsuariosController.getUsuarioById);
router.get('/:usuarioId/especialidades', UsuariosController.getEspecialidadByUsuarioId)
router.post('/', UsuariosController.createUsuario);

router.put("/:usuarioId", UsuariosController.updateUsuario);
router.delete('/:usuarioId', UsuariosController.deleteUsuario);

module.exports = router;