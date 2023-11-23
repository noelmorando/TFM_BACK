const router = require('express').Router();
const EspecialidadesController = require('../../controllers/especialidades.controller');

router.get('/', EspecialidadesController.getAllEspecialidades);

module.exports = router;