const express =require('express');
const router = express.Router();
const {verificarToken} = require('../Mid/token');
const productoController=require('../Controllers/ProductoController');


router.get('/',verificarToken,productoController.productoGet);
//router.get('/:id',verificarToken,usuarioController.usuarioGet);
//router.put('/:id',verificarToken,usuarioController.usuarioPut);
router.post('/',verificarToken,productoController.productoCreatet);
//router.post('/login/',usuarioController.usuarioLoginPut);
//router.delete('/:id',verificarToken,usuarioController.usuarioDelete);

module.exports = router;