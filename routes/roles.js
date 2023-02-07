const { Router } = require('express');
const { crearRol, obtenerRol } = require('../controllers/rolesController');
const { validarCampos } = require('../middlewares/validarCampos');

const router = new Router();

router.post('/',[
    validarCampos
], crearRol);

router.get('/', obtenerRol);

module.exports = router;