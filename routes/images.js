const { Router } = require('express');

const { convertirImagen } = require('../controllers/imageToText') ;
const { validarImagen } = require('../middlewares/validarImagen') ;


const router = Router();

router.post('/', validarImagen, convertirImagen);


module.exports = router;