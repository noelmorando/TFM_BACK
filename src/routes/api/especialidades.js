const router = require('express').Router();
const EspecialidadesController = require('../../controllers/especialidades.controller');

router.get('/', EspecialidadesController.getAllEspecialidades);
router.get('/:especialidadId/profesores', EspecialidadesController.getProfesoresByEspecialidadById)


module.exports = router;