const router = require('express').Router()

router.use('/usuarios', require('./api/usuarios'))
router.use('/especialidades', require('./api/especialidades'))

module.exports = router; 