const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerUsuarios, crearUsuario } = require('../controllers/usuariosController');
const { existeEmail, existeUsuario, existeRol } = require('../helpers/validators');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { esAdminRole } = require('../middlewares/validarRoles');


const router = Router();

router.use(validarJWT);

router.get('/', [esAdminRole,validarCampos],obtenerUsuarios);

router.post('/',[
    esAdminRole,
    check('nombre_usuario','El nombre de usuario es obligatorio').not().isEmpty(),
    check('nombre_usuario','No puede exceder mas de 12 caracteres min 6 ').isLength( {min: 6, max: 12} ),
    check('nombre_usuario','Nombre de usuario ya existente').custom( existeUsuario ),
    check('pass','El password es obligatorio').not().isEmpty(),
    check('pass', 'Minimo 6 caracteres maximo 10').isLength( {min: 6, max: 10} ),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'El correo es Invalido').isEmail(),
    check('correo','El correo ya esta registrado').custom( existeEmail ),
    check('id_rol').custom( () => existeRol('2') ),
    validarCampos
], crearUsuario);

router.delete('/:id');

router.put('/:id');



module.exports = router;