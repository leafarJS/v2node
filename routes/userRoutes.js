const {Router} = require('express');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/userControllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { esRolValidado, existeEmail, existeUsuarioID } = require('../helpers/dbValidators');


const router  = Router()

router.get("/", userGet);

    router.put(
      "/:id", 
      [
      check('id', 'No es un ID valido').isMongoId(), 
      check('id').custom(existeUsuarioID),
      check('rol').custom(esRolValidado),
      validarCampos
    ], 
    userPut
    );

    router.post(
      "/",
      [
        check("name", "El nombre es un campo obligatorio").not().isEmpty(),
        check("password", "minimo 6 caracteres").isLength({ min: 6 }),
        check("email", "El nombre del correo no es valido").isEmail(),
        check('email').custom(existeEmail),
        //check("rol", "No es un rol permitido").isIn(["ADMIN_ROL", "USER_ROL"]),
        check('rol').custom(esRolValidado),
        validarCampos
      ],
      userPost
    );

    router.delete(
      "/:id",
      userDelete
    );

    router.patch("/", userPatch);


module.exports = router