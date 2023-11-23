const router = require('express').Router();
const UsuariosController = require('../../controllers/usuarios.controller');

router.get('/', UsuariosController.getAllUsuarios);
router.get('/:usuarioId', UsuariosController.getUsuarioById);
router.get('/:profesorId/especialidades', UsuariosController.getEspecialidadByProfesorId)
router.get('/:profesorId/chats/:alumnoId', UsuariosController.getChatByUsuariosId)
router.get('/:profesorId/puntuaciones', UsuariosController.getPuntuacionesByProfesorId)
router.get('/:profesorId/clases/:alumnoId',UsuariosController.getClasesByUsuariosId)
router.post('/', UsuariosController.createUsuario);
router.put("/:usuarioId", UsuariosController.updateUsuario);
router.delete('/:usuarioId', UsuariosController.deleteUsuario);

module.exports = router;