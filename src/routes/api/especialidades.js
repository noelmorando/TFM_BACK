const router = require('express').Router();
const EspecialidadesController = require('../../controllers/especialidades.controller');

router.get('/', EspecialidadesController.getAllEspecialidades);
router.get('/profesores/:especialidadId', EspecialidadesController.getProfesoresByEspecialidadById);
router.get('/page', EspecialidadesController.getEspecialidadesByPage);



module.exports = router;