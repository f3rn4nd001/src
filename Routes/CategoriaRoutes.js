const express =require('express');
const router = express.Router();
const {verificarToken} = require('../Mid/token');
const categoriaController=require('../Controllers/CategoriaController');

//router.get('/',verificarToken,usuarioController.usuariosGet);
//router.get('/:id',verificarToken,usuarioController.usuarioGet);
//router.put('/:id',verificarToken,usuarioController.usuarioPut);
router.post('/',verificarToken,categoriaController.categoriaCreatet);
/*router.post('/login/',usuarioController.usuarioLoginPut);
router.delete('/:id',verificarToken,usuarioController.usuarioDelete);*/
module.exports = router;