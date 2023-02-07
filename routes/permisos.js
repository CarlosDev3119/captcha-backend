const { Router } = require('express');
const { check } = require('express-validator');
const { crearPermiso, obtenerPermisos } = require('../controllers/permisosController');
const { validarCampos } = require('../middlewares/validarCampos');

const router = new Router();

router.post('/', [ 
    check('permiso','El permiso es obligatorio').not().isEmpty(),
    check('permiso','El permiso tiene que tener min 6 y max 12 maracteres').isLength( {min: 6, max: 15} ),
    validarCampos 
], crearPermiso)

router.get('/', obtenerPermisos)

module.exports = router;