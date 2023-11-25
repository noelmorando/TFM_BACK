const router = require('express').Router();
const UsuariosController = require('../../controllers/usuarios.controller');
const { checkRole, preAuthMiddleware, checkToken } = require('../../middlewares/auth.middleware');

router.get('/todos', checkToken, UsuariosController.getAllUsuarios);
router.get('/:usuarioId', checkToken, UsuariosController.getUsuarioById);
router.get('/:profesorId/especialidades', checkToken, checkRole(['prof', 'admin']), UsuariosController.getEspecialidadByProfesorId)
router.get('/:profesorId/chats/:alumnoId', checkToken, checkRole(['prof', 'alumn']), UsuariosController.getChatByUsuariosId)
router.get('/:profesorId/puntuaciones', checkToken, checkRole(['prof']), UsuariosController.getPuntuacionesByProfesorId)
router.get('/:profesorId/clases/:alumnoId', checkToken, checkRole(['prof', 'admin']), UsuariosController.getClasesByUsuariosId);
router.post('/register', preAuthMiddleware, UsuariosController.register);
router.post('/login', preAuthMiddleware, UsuariosController.login);
router.post('/', checkToken, UsuariosController.createUsuario);
router.post('/:profesorId/especialidades', checkToken, checkRole(['prof', 'admin']), UsuariosController.insertEspecialidadByProfesor)
router.post('/:profesorId/clases', checkToken, checkRole(['prof', 'admin']), UsuariosController.insertClaseByProfesor)
router.post('/:profesorId/chats/:alumnoId', checkToken, checkRole(['prof', 'alumn']), UsuariosController.insertChatByUsersId)
router.put("/:usuarioId", checkToken, UsuariosController.updateUsuario);
router.delete('/:profesorId/especialidades', checkToken, checkRole(['prof', 'admin']), UsuariosController.deleteEspecialidadByUsuario)
router.delete('/:usuarioId', checkToken, checkRole(['admin']), UsuariosController.deleteUsuario);
router.delete('/:profesorId/clases', checkToken, checkRole(['prof', 'admin']), UsuariosController.deleteClaseByProfesorId)

module.exports = router;