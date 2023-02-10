const { Router } = require('express');

const { convertirImagen } = require('../controllers/imageToText') ;
const { validarCampos } = require('../middlewares/validarCampos');
const { validarImagen } = require('../middlewares/validarImagen') ;
const { validarJWT } = require('../middlewares/validarJWT');
const { esAdminRole, esUsuarioGeneral } = require('../middlewares/validarRoles');


const router = Router();

router.post('/', [validarJWT, esUsuarioGeneral, validarImagen, validarCampos], convertirImagen);


module.exports = router;