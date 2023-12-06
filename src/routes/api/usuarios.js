const router = require('express').Router();
const UsuariosController = require('../../controllers/usuarios.controller');
const { checkRole, preAuthMiddleware, checkToken } = require('../../middlewares/auth.middleware');

router.get('/todos', UsuariosController.getAllUsuarios);
router.get('/todos/pag', UsuariosController.getAllUsuariosByPage);
router.get('/:usuarioId', UsuariosController.getUsuarioById);
router.get('/clases/:usuarioId',checkToken, checkRole(['prof', 'alumn']), UsuariosController.getClasesByUsuarioId);
router.get('/conexion/:profesorId',checkToken, checkRole(['prof', 'alumn']), UsuariosController.getInfoProfesorByConexion);
router.get('/especialidades/:profesorId', checkToken, checkRole(['prof','alumn']), UsuariosController.getEspecialidadByProfesorId)
router.get('/chats/:profesorId&:alumnoId', checkToken, checkRole(['prof', 'alumn']), UsuariosController.getChatByUsuariosId)
router.get('/puntuaciones/:profesorId', UsuariosController.getPuntuacionesByProfesorId)
router.get('/clases/:profesorId&:alumnoId&:especialidadId', checkToken, checkRole(['prof','alumn']), UsuariosController.getClasesByUsuariosId)
router.get('/alumnos/:profesorId',checkToken, checkRole(['prof','alumn']), UsuariosController.getAlumnosByProfesorId)
router.post('/register', preAuthMiddleware, UsuariosController.register)
router.post('/login', preAuthMiddleware, UsuariosController.login)
router.post('especialidades/:profesorId&:especialidadId', checkToken, checkRole(['prof']), UsuariosController.insertEspecialidadByProfesor)
router.post('/agenda/:profesorId/clases', checkToken, checkRole(['prof']), UsuariosController.insertClaseByProfesor)
router.post('/comentario/:profesorId/chats/:alumnoId', checkToken, checkRole(['prof', 'alumn']), UsuariosController.insertChatByUsersId)
router.post('/solicitud/:profesorId&:alumnoId&:especialidadId',checkToken, checkRole(['prof','alumn']), UsuariosController.insertAlumnoByProfesorId)
router.put('/clases/:profesorId&:alumnoId&:especialidadId',checkToken, checkRole(['prof','alumn']), UsuariosController.updateAlumnoByProfesorId)
router.put("/:usuarioId", checkToken, UsuariosController.updateUsuario)
//pendiente
router.delete('/especialidades/:profesorId&:especialidadId', checkToken, checkRole(['prof']), UsuariosController.deleteEspecialidadByUsuario)
router.delete('/clases/:profesorId&:alumnoId&:especialidadId&:fecha', checkToken, checkRole(['prof']), UsuariosController.deleteClaseByProfesorId)
router.delete('/conexion/:profesorId&:alumnoId&:especialidadId',checkToken, checkRole(['prof','alumn']), UsuariosController.deleteAlumnoByProfesorId)

module.exports = router;
