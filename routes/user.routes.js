import { Router } from 'express'
import { check } from 'express-validator';
import { usersDelete, usersGet, usersPatch, usersPost, usersPut } from '../controllers/users.controllers.js';
import { validarCampos } from '../middlewares/validar_campos.js';
import { emailExiste, esRoleValido, existeUsuarioPorId } from '../helpers/db-validators.js';


export const userRouter = Router();

userRouter.get('/', usersGet)
userRouter.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe ser de mas de 6 letras').isLength({ min: 6 }),
  check('email', 'El correo no tiene un formato valido').isEmail(),
  check('email').custom(emailExiste),
  //check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(esRoleValido),
  validarCampos
], usersPost)
userRouter.put('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('role').custom(esRoleValido),
  validarCampos
], usersPut)
userRouter.patch('/', usersPatch)
userRouter.delete('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], usersDelete)