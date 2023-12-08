const router = require('express').Router();
const EspecialidadesController = require('../../controllers/especialidades.controller');

router.get('/', EspecialidadesController.getAllEspecialidades);
router.get('/:especialidadId/profesores', EspecialidadesController.getProfesoresByEspecialidadById);
router.get('/page', EspecialidadesController.getEspecialidadesByPage);
router.post('/:profesorId&:especialidadId', EspecialidadesController.insertEspecialidadByProfesor)



module.exports = router;