const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.post('/',[
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'El correo es invalido').isEmail(),
    validarCampos
], login);

module.exports = router;