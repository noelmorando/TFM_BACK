const router = require('express').Router();
const UsuariosController = require('../../controllers/usuarios.controller');
const { checkRole, preAuthMiddleware, checkToken } = require('../../middlewares/auth.middleware');

router.get('/todos', checkToken, UsuariosController.getAllUsuarios);
router.get('/:usuarioId', checkToken, UsuariosController.getUsuarioById);

router.get('/:usuarioId/clases', UsuariosController.getClasesByUsuarioId);

router.get('/:profesorId/especialidades', checkToken, checkRole(['prof', 'admin']), UsuariosController.getEspecialidadByProfesorId)
router.get('/:profesorId/chats/:alumnoId', checkToken, checkRole(['prof', 'alumn']), UsuariosController.getChatByUsuariosId)
router.get('/:profesorId/puntuaciones', checkToken, checkRole(['prof']), UsuariosController.getPuntuacionesByProfesorId)
//este seria solo profesor porque el admin no tiene que ver las clases.
router.get('/:profesorId/clases/:alumnoId', checkToken, checkRole(['prof', 'admin']), UsuariosController.getClasesByUsuariosId);
//el admin no le interesa ver si hay conexion entre alumno y profesor.
router.get('/:profesorId/alumnos',checkToken, checkRole(['prof', 'admin']), UsuariosController.getAlumnosByProfesorId);
router.post('/register', preAuthMiddleware, UsuariosController.register);
router.post('/login', preAuthMiddleware, UsuariosController.login);
//al admin no le interesa agregar una especialidad.
router.post('/:profesorId/especialidades', checkToken, checkRole(['prof', 'admin']), UsuariosController.insertEspecialidadByProfesor)
//al admin no le interesa agregar una clase.
router.post('/:profesorId/clases', checkToken, checkRole(['prof', 'admin']), UsuariosController.insertClaseByProfesor)
router.post('/:profesorId/chats/:alumnoId', checkToken, checkRole(['prof', 'alumn']), UsuariosController.insertChatByUsersId)
router.post('/:profesorId/alumnos',checkToken, checkRole(['prof']), UsuariosController.insertAlumnoByProfesorId);
router.put("/:usuarioId", checkToken, UsuariosController.updateUsuario);
router.put('/:profesorId/alumnos',checkToken, checkRole(['prof']), UsuariosController.updateAlumnoByProfesorId);
//al admin no le interesa eliminar una especialidad.
router.delete('/:profesorId/especialidades', checkToken, checkRole(['prof', 'admin']), UsuariosController.deleteEspecialidadByUsuario)
router.delete('/:usuarioId', checkToken, checkRole(['admin']), UsuariosController.deleteUsuario);
//al admin no le interesa eliminar una clase.
router.delete('/:profesorId/clases', checkToken, checkRole(['prof', 'admin']), UsuariosController.deleteClaseByProfesorId)
router.delete('/:profesorId/alumnos',checkToken, checkRole(['prof']), UsuariosController.deleteAlumnoByProfesorId);

module.exports = router;
